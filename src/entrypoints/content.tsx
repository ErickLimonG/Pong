import AddonManager from "@/Addons/AddonManager";
import isIframe from "@/Addons/helpers/isIframe";

export default defineContentScript({
  matches: ['*://*/*'],
  async main(ctx) {
    const iframe = document.querySelector('#content > #contentIframe')
    if (!iframe) return

    const renderAddons: MutationCallback = (mutations) => {
      for (const mutation of mutations) {
        if (!isIframe(mutation.target)) break
        const iframe = mutation.target as HTMLIFrameElement

        AddonManager.iframe = iframe
        AddonManager.renderAddons()
      }
    }

    const observer = new MutationObserver(renderAddons)

    observer.observe(iframe, {
      attributes: true,
      attributeFilter: ["src"]
    })
  },
});
