import Widget from "@/interfaces/Widget";
import { WidgetConstructor } from "@/interfaces/WidgetConstructor";
import logger from "@/logger";
import ReactDOM from "react-dom/client";
import availableAddons from "./AvailableAddons";
import WidgetManager from "./WidgetManager";


class AddonManager {
    static iframe: HTMLIFrameElement

    static removeReactRootIfExists(document: Document) {
        const existingWrapper = document.getElementById('react-root');
        if (existingWrapper) {
            existingWrapper.remove();
        }
    }

    static appendReactRootWrapperToBody(document: Document) {
        const wrapper = document.createElement("div")
        wrapper.id = "react-root"
        logger.debug(`wrapper,${wrapper}`)
        document.body.append(wrapper)
        return wrapper
    }

    static getValidWidgets(widgets: WidgetConstructor[]): Widget[] {
        const validWidgets: Widget[] = []

        for (const widgetConstructor of widgets) {
            const widget = new widgetConstructor();
            const doc = AddonManager.iframe.contentDocument

            if (!doc) return []

            const destination = doc.querySelector(widget.destinationQuery);
            if (!destination) {
                logger.warn(`Skipping widget ${widget}: destination not found`);
                continue;
            }
            validWidgets.push(widget);
        }
        return validWidgets
    }

    static initReactInIframe(iframeDocument: Document): ReactDOM.Root {
        AddonManager.removeReactRootIfExists(iframeDocument);
        const rootWrapper = AddonManager.appendReactRootWrapperToBody(iframeDocument);
        const root = ReactDOM.createRoot(rootWrapper);
        return root
    }

    static renderWidgets(widgets: WidgetConstructor[]) {
        const iframeDocument = AddonManager.iframe.contentDocument;

        if (!iframeDocument) return
        logger.debug('Iframe loaded:', iframeDocument.location.href);

        const root = AddonManager.initReactInIframe(iframeDocument)

        const validWidgets = AddonManager.getValidWidgets(widgets)

        root.render(
            <WidgetManager widgets={validWidgets} iframeDocument={iframeDocument} />
        );
    }

    static renderAddons() {
        for (const addon of availableAddons) {
            if (!AddonManager.iframe.getAttribute('src')?.includes(addon.iframeSource)) {
                continue
            }

            const onLoadRenderWidgets = () => {
                AddonManager.renderWidgets(addon.widgets)
            }

            AddonManager.iframe.addEventListener('load', onLoadRenderWidgets, { once: true })
        }
    }
}

export default AddonManager