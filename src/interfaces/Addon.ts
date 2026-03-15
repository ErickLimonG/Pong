import { WidgetConstructor } from "./WidgetConstructor"

export default interface Addon {
    iframeSource: string
    widgets: Array<WidgetConstructor>
}