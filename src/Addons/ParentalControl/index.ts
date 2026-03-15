import Widget from "@/interfaces/Widget";
import ToggleAllWeekWidget from "./ToggleAllWeek/ToggleAllWeekButtonWidget";
import Addon from "@/interfaces/Addon";

const ParentalControlAddon: Addon = {
    iframeSource: 'parental-ctrl',
    widgets: [ToggleAllWeekWidget]
}

export default ParentalControlAddon