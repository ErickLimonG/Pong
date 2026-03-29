export default interface ITimePickerDomAdapter {
  findStartTimeInputs(): Array<Element> | null;
  findEndTimeInputs(): Array<Element> | null;
  findStartTimeCell(): Element | null;
  findEndTimeCell(): Element | null;
  createClocketInput(): HTMLInputElement | null;
  cleanupTimeRowsChildren(): void;
}
