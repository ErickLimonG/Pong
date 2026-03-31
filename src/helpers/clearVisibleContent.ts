function cleanNodes(node: Node) {
  // Hide the original inputs
  if (node.nodeType === Node.ELEMENT_NODE)
    (node as Element).setAttribute("hidden", "true");
  // Remove the text nodes
  if (node.nodeType === Node.TEXT_NODE) node.parentNode?.removeChild(node);
}

export default function clearVisibleContent(element: HTMLElement) {
  if (!element) return;
  const children = [...element.childNodes];
  children.forEach(cleanNodes);
}
