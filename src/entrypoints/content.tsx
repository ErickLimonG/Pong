import addonMatcher from "@/Addons/AddonMatcher";
import addons from "@/Addons/AvailableAddons";
import logger from "@/logger";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom/client";
import Widget from "@/interfaces/Widget";
import { WidgetConstructor } from "@/interfaces/WidgetConstructor";
import { createContext } from "react";
//import ToggleAllWeekButton from "@/Addons/ParentalControl/ToggleAllWeek/ToggleAllWeekButton";

export default defineContentScript({
  matches: ['*://*/*'],
  async main(ctx) {

    function isIframe(node: any) {
      return (node as HTMLIFrameElement).contentWindow ? true : false
    }

    function removeReactRootIfExists(document: Document) {
      const existingWrapper = document.getElementById('react-root');
      if (existingWrapper) {
        existingWrapper.remove();
      }
    }

    function appendWrapperToBody(document: Document) {
      const wrapper = document.createElement("div")
      wrapper.id = "react-root"
      logger.debug(`wrapper,${wrapper}`)
      document.body.append(wrapper)
      return wrapper
    }

    function renderWidgets(iframe: HTMLIFrameElement, widgets: WidgetConstructor[]) {
      const iframeDoc = iframe.contentDocument as HTMLDocument;
      logger.debug('Loaded:', iframeDoc?.location.href);

      removeReactRootIfExists(iframeDoc);
      const wrapper = appendWrapperToBody(iframeDoc);
      const root = ReactDOM.createRoot(wrapper);

      const validWidgets: Widget[] = [];
      for (const widgetConstructor of widgets) {
        const widget = new widgetConstructor();
        const destination = iframeDoc.querySelector(widget.destinationQuery);
        if (!destination) {
          logger.warn(`Skipping widget ${widget.constructor.name}: destination not found`);
          continue;
        }
        validWidgets.push(widget);
      }

      root.render(
        <WidgetManager widgets={validWidgets} iframeDocument={iframeDoc} />
      );
    }

    const WidgetContext = createContext(null)

    function WidgetManager({
      widgets, iframeDocument
    }: {
      widgets: Widget[],
      iframeDocument: Document
    }) {
      return (
        <>
          {widgets.map((widget, index) => (
            <WidgetContext.Provider value={iframeDocument} key={index} >
              <WidgetPortal
                widget={widget}
              />
            </WidgetContext.Provider>
          ))}
        </>
      );
    }

    function WidgetPortal({ widget }: { widget: Widget }) {
      const iframeDocument = useContext(WidgetContext)
      const widgetReactElement = widget.init(iframeDocument)
      const targetElement = iframeDocument.querySelector(widget.destinationQuery)
      return createPortal(widgetReactElement, targetElement);
    }

    function renderAddons(iframe: HTMLIFrameElement) {
      for (const addon of addons) {
        const iframeSrc = addon.iframeSource
        if (!iframe.getAttribute('src')?.includes(iframeSrc)) continue
        iframe.addEventListener('load', () => renderWidgets(iframe, addon.widgets), { once: true })
      }
    }

    const iframe = document.querySelector('#content > #contentIframe')

    const mutationCallback: MutationCallback = (mutations) => {
      for (const mutation of mutations) {
        if (!isIframe(mutation.target)) break
        const iframe = mutation.target as HTMLIFrameElement
        renderAddons(iframe)
      }
    }

    const observer = new MutationObserver(mutationCallback)

    if (!iframe) return

    observer.observe(iframe, {
      attributes: true,
      attributeFilter: ["src"]
    })
  },
});
