export default interface ITimePickerDomAdapter {
  findStartTimeInputs(): Array<Element>;
  findEndTimeInputs(): Array<Element>;
  findStartTimeCell(): Element | null;
  findEndTimeCell(): Element | null;
  createClocketInput(): HTMLInputElement | null;
  cleanupTimeRowsChildren(): void;
}
