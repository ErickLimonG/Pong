import ITimePickerDomAdapter from "./ITimePickerDomAdapter";
import cleanElementChildren from "@/helpers/cleanFormNode";
import logger from "@/logger";

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

  cleanupTimeRowsChildren() {
    const timeInputsParents = new Set([
      this.findStartTimeCell(),
      this.findEndTimeCell(),
    ]);

    if (timeInputsParents.has(null)) {
      logger.warn("Couldnt get start and end time cells");
      return;
    }

    timeInputsParents.forEach((cell) => cleanElementChildren(cell));
  }
}
