import Widget from "@/interfaces/Widget";
import ITimePickerDomAdapter from "./DomAdapter/ITimePickerDomAdapter";
import TimePickerDomAdapter from "./DomAdapter/TimePickerDomAdapter";
import createComponent from "@/helpers/createComponent";

export default class TimePickerWidget implements Widget {
  adapter: ITimePickerDomAdapter;

  get components() {
    if (!this.TimePickers) {
      return [];
    }

    return this.TimePickers;
  }

  constructor(document: Document) {
    this.adapter = new TimePickerDomAdapter(document);
  }

  createTimePicker(hourInput: Element, minuteInput: Element) {
    const syncTimeValues = (event) => {
      console.log(`timepicker value:${event.target.value}`);
      let [hour, minute] = event.target.value.split(":");
      if (!minute) minute = "00";
      (hourInput as HTMLInputElement).value = hour;
      (minuteInput as HTMLInputElement).value = minute;
    };

    return <input type="time" onInput={syncTimeValues}></input>;
  }

  get TimePickers() {
    const [startHourInput, startMinuteInput] =
      this.adapter.findStartTimeInputs();

    const [endHourInput, endMinuteInput] = this.adapter.findEndTimeInputs();

    const startTimeCell = this.adapter.findStartTimeCell();
    const endTimeCell = this.adapter.findStartTimeCell();

    if (!(startTimeCell && endTimeCell)) return;

    const startTimePicker = createComponent(
      "body > form:nth-child(3) > div.data_common.data_common_notitle > table:nth-child(3) > tbody > tr:nth-child(1) > td",
      this.createTimePicker(startHourInput, startMinuteInput),
    );

    const endTimePicker = createComponent(
      "body > form:nth-child(3) > div.data_common.data_common_notitle > table:nth-child(3) > tbody > tr:nth-child(2) > td",
      this.createTimePicker(endHourInput, endMinuteInput),
    );

    this.adapter.cleanupTimeRowsChildren();

    return [startTimePicker, endTimePicker];
  }
}
