import IToggleAllWeekDomAdapter from "./IToggleAllWeekDomAdapter";

const PARENT_CONTROL_FORM = "form[name=formParentCtrlAdd]";

const daysTableString =
  PARENT_CONTROL_FORM +
  " " +
  "div:first-child > table:nth-of-type(2) tr:nth-of-type(2)";

export class ToggleAllWeekDomAdapter implements IToggleAllWeekDomAdapter {
  document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  findDayInputs() {
    return Array.from(
      this.document.querySelectorAll(daysTableString + " > td input"),
    );
  }
}
