import Widget from "@/interfaces/Widget";
import ToggleAllWeekButton from "./ToggleAllWeekButton";
import { ToggleAllWeekDomAdapter } from "./DomAdapter/ToggleAllWeekDomAdapter";
import IToggleAllWeekDomAdapter from "./DomAdapter/IToggleAllWeekDomAdapter";
import component from "@/interfaces/component";

class ToggleAllWeekWidget implements Widget {
  private adapter: IToggleAllWeekDomAdapter;

  constructor(document: Document) {
    this.adapter = new ToggleAllWeekDomAdapter(document);
  }

  get components() {
    const dayInputs = this.adapter.findDayInputs();
    const allDayInputs = dayInputs as HTMLInputElement[];

    const toggleAllWeek: component = {
      destinationQuery:
        "body > form:nth-child(3) > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > th:nth-child(1)",
      component: <ToggleAllWeekButton allDayInputs={allDayInputs} />,
    };

    return [toggleAllWeek];
  }
}

export default ToggleAllWeekWidget;
