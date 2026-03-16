import Widget from "@/interfaces/Widget";
import ToggleAllWeekButton from "./ToggleAllWeekButton";
import logger from "@/logger";

const PARENT_CONTROL_FORM = "form[name=formParentCtrlAdd]";
const daysTableString =
  PARENT_CONTROL_FORM +
  " " +
  "div:first-child > table:nth-of-type(2) tr:nth-of-type(2)";

class ToggleAllWeekWidget implements Widget {
  readonly destinationQuery =
    PARENT_CONTROL_FORM +
    " " +
    "div:first-child > table:nth-of-type(2) tr:nth-of-type(2)" +
    " th:first-child";

  init(iframeDoc: Document) {
    logger.debug("ToggleAllWeekWidget instantiated");
    const inputs = iframeDoc.querySelectorAll(daysTableString + " > td input"); // daysTableString + " > td input"
    const allDayInputs = Array.from(inputs) as HTMLInputElement[];
    return <ToggleAllWeekButton allDayInputs={allDayInputs} />;
  }
}

export default ToggleAllWeekWidget;
