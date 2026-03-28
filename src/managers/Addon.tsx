import Widget from "@/interfaces/Widget";
import { WidgetConstructor } from "@/interfaces/WidgetConstructor";
import logger from "@/logger";
import ReactDOM from "react-dom/client";
import availableAddons from "../Addons/AvailableAddons";
import WidgetManager from "./Widget";
import ExtrinsicWidget from "@/interfaces/ExtrinsicWidget";
import Addon from "@/interfaces/Addon";
import { ExtrinsicWidgetConstructor } from "@/interfaces/ExtrinsicWidgetConstructor";

class AddonManager {
  static iframe: HTMLIFrameElement;

  static get document() {
    const doc = AddonManager.iframe.contentDocument;
    if (!doc) return null;
    return doc;
  }

  static removeReactRootIfPresent() {
    const existingWrapper = this.document.getElementById("react-root");
    if (existingWrapper) {
      // TODO: check if not unmounting root incurs performance penalty
      existingWrapper.remove();
    }
  }

  static createReactRootDiv() {
    const wrapper = this.document.createElement("div");
    wrapper.id = "react-root";
    logger.debug(`wrapper,${wrapper}`);
    return wrapper;
  }

  static createWidgets(widgets: WidgetConstructor[]): Widget[] {
    const widgetComponents: Widget[] = [];

    for (const widgetConstructor of widgets) {
      if (!this.document) return widgetComponents;
      const widget = new widgetConstructor(this.document);

      widgetComponents.push(widget);
    }

    return widgetComponents;
  }

  static createExtrinsicWidgets(
    widgets: ExtrinsicWidgetConstructor[],
  ): ExtrinsicWidget[] {
    const widgetComponents: ExtrinsicWidget[] = [];

    for (const widgetConstructor of widgets) {
      if (!this.document) return widgetComponents;
      const widget = new widgetConstructor(this.document);

      widgetComponents.push(widget);
    }

    return widgetComponents;
  }

  static createReactRoot(): ReactDOM.Root {
    AddonManager.removeReactRootIfPresent(this.document);
    const rootDiv = AddonManager.createReactRootDiv(this.document);
    this.document.body.append(rootDiv);
    const root = ReactDOM.createRoot(rootDiv);
    return root;
  }

  static renderExtrinsicWidgets(
    extrinsicWidgetConstructors: ExtrinsicWidgetConstructor[],
  ) {
    if (extrinsicWidgetConstructors) {
      const extrinsicWidgets = AddonManager.createExtrinsicWidgets(
        extrinsicWidgetConstructors,
      );

      for (const widget of extrinsicWidgets) {
        widget.init();
      }
    }
  }

  static renderWidgets(widgetConstructors: WidgetConstructor[]) {
    if (widgetConstructors) {
      const widgets = AddonManager.createWidgets(widgetConstructors);
      const root = AddonManager.createReactRoot();

      root.render(
        <WidgetManager widgets={widgets} iframeDocument={this.document} />,
      );
    }
  }

  static displayWidgets(addon: Addon) {
    const addonWidgets = addon.widgets;
    const addonExtrinsicWidgets = addon.extrinsicWidgets;

    if (!addonWidgets) return;
    this.renderWidgets(addonWidgets);

    if (!addonExtrinsicWidgets) return;
    this.renderExtrinsicWidgets(addonExtrinsicWidgets);
  }

  static renderAddons() {
    for (const addon of availableAddons) {
      if (
        !AddonManager.iframe.getAttribute("src")?.includes(addon.iframeSource)
      ) {
        continue;
      }

      const onLoadRenderWidgets = () => {
        if (!this.document) return;
        logger.debug("Iframe loaded:", this.document.location.href);
        AddonManager.displayWidgets(addon);
      };

      AddonManager.iframe.addEventListener("load", onLoadRenderWidgets, {
        once: true,
      });
    }
  }
}

export default AddonManager;
