import Widget from "@/interfaces/Widget";
import ToggleAllWeekButton from "./ToggleAllWeekButton";
import { ToggleAllWeekDomAdapter } from "./DomAdapter/ToggleAllWeekDomAdapter";
import IToggleAllWeekDomAdapter from "./DomAdapter/IToggleAllWeekDomAdapter";

class ToggleAllWeekWidget implements Widget {
  readonly destinationQuery =
    "body > form:nth-child(3) > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > th:nth-child(1)";
  private adapter: IToggleAllWeekDomAdapter;

  constructor(document: Document) {
    this.adapter = new ToggleAllWeekDomAdapter(document);
  }

  get component() {
    const dayInputs = this.adapter.findDayInputs();
    const allDayInputs = dayInputs as HTMLInputElement[];
    return <ToggleAllWeekButton allDayInputs={allDayInputs} />;
  }
}

export default ToggleAllWeekWidget;
