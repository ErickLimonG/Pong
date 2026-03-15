import { createPortal } from "react-dom"
import addons from "./AvailableAddons"
import logger from "@/logger"
import { IFrameHandler } from "./IFrameHandler"
import { WidgetConstructor } from "@/interfaces/WidgetConstructor"

async function renderWidgets(widgets: WidgetConstructor[]) {
    for (const widgetClass of widgets) {
        const widget = new widgetClass()
        logger.debug('widget creating')
        logger.debug(widget)

        const element = await widget.init()

        logger.debug('Initing widget')
        logger.debug(element)

        const location = await IFrameHandler.querySelector(widget.destinationQuery)
        logger.debug(`element for portal, ${location}`)
        logger.debug(`using query, ${widget.destinationQuery}`)

        if (!location) {
            logger.debug('NO LOCATION FOUND FOR PORTAL')
            return
        }

        createPortal(element, location)
    }
}

async function renderAddons(iframe: Element) {
    for (const addon of addons) {
        const iframeSrc = addon.iframeSource

        if (!matchesSource(iframe, iframeSrc)) return

        logger.debug(`Applying addon, ${iframeSrc}`)
        await renderWidgets(addon.widgets)
    }
}

function matchesSource(node: Element, source: string) {
    return node.getAttribute("src")?.includes(source)
}

function isIframe(node: any) {
    return (node as HTMLIFrameElement).contentWindow ? true : false
}

const init = () => {
    const targetIframe = document.querySelector('#content > #contentIframe')

    const mutationCallback: MutationCallback = (mutations) => {
        for (const mutation of mutations) {
            if (!isIframe(mutation.target)) break
            const iframe = mutation.target as Element
            logger.debug('iframe mutated')
            renderAddons(iframe)
        }
    }

    const observer = new MutationObserver(mutationCallback)

    if (targetIframe) {
        observer.observe(targetIframe, {
            attributes: true,
            attributeFilter: ["src"]
        })
    }
}

const addonMatcher = {
    init
}

export default addonMatcher



