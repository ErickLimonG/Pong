import AddonManager from "@/Addons/AddonManager";

export default defineContentScript({
  matches: ['*://*/*'],
  async main(ctx) {
    const iframe = document.querySelector('#content > #contentIframe')
    if (!iframe) return

    function isIframe(node: any) {
      return (node as HTMLIFrameElement).contentWindow ? true : false
    }

    const mutationCallback: MutationCallback = (mutations) => {
      for (const mutation of mutations) {
        if (!isIframe(mutation.target)) break
        const iframe = mutation.target as HTMLIFrameElement

        AddonManager.iframe = iframe
        AddonManager.renderAddons()
      }
    }

    const observer = new MutationObserver(mutationCallback)

    observer.observe(iframe, {
      attributes: true,
      attributeFilter: ["src"]
    })
  },
});
