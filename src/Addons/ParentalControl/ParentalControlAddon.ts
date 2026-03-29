import ToggleAllWeekWidget from "./ToggleAllWeek/ToggleAllWeekButtonWidget";
import Addon from "@/interfaces/Addon";
import TimePickerWidget from "./TimePicker/TimePickerWidget";

const ParentalControlAddon: Addon = {
  iframeSource: "parental-ctrl",
  widgets: [ToggleAllWeekWidget, TimePickerWidget],
};

export default ParentalControlAddon;
