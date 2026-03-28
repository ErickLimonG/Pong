export default function isIframe(node: any) {
  return (node as HTMLIFrameElement).contentWindow ? true : false;
}
