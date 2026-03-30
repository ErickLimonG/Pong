import ToggleAllWeekWidget from "./ToggleAllWeek/ToggleAllWeekButtonWidget";
import Addon from "@/interfaces/Addon";
import TimePickerWidget from "./TimePicker/TimePickerWidget";
import MacAddressWidget from "./MacAddress/MacAddressWidget";

const ParentalControlAddon: Addon = {
  iframeSource: "parental-ctrl",
  widgets: [ToggleAllWeekWidget, TimePickerWidget, MacAddressWidget],
};

export default ParentalControlAddon;
