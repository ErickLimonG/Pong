import ITimePickerDomAdapter from "./ITimePickerDomAdapter";

export default class TimePickerDomAdapter implements ITimePickerDomAdapter {
  document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  createClocketInput() {
    const input = this.document.createElement("input");
    input.dataset.clocket = "format: HH:mm";
    return input;
  }

  findStartTimeInputs() {
    return Array(...this.document.querySelectorAll('input[name^="start"]'));
  }

  findEndTimeInputs() {
    return Array(...this.document.querySelectorAll('input[name^="end"]'));
  }

  findStartTimeCell() {
    return this.findStartTimeInputs()[0].parentElement;
  }

  findEndTimeCell() {
    return this.findEndTimeInputs()[0].parentElement;
  }

  processDataRowNodes = (node: Node) => {
    // Hide the original inputs
    if (node.nodeType === Node.ELEMENT_NODE)
      (node as Element).setAttribute("hidden", "true");
    // Remove the ":" text nodes
    if (node.nodeType === Node.TEXT_NODE) node.parentNode?.removeChild(node);
  };

  cleanupTimeRowsChildren() {
    const timeInputsParents = new Set([
      this.findStartTimeCell(),
      this.findEndTimeCell(),
    ]);

    timeInputsParents.forEach((tableData) => {
      if (!tableData) return;
      const children = [...(tableData as HTMLElement).childNodes];
      children.forEach(this.processDataRowNodes);
    });
  }
}
