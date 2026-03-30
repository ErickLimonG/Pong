import createComponent from "@/helpers/createComponent";
import Widget from "@/interfaces/Widget";
import MacAddressDomAdapter from "./DomAdapter/MacAdressDomAdapter";
import IMacAdressDomAdapter from "./DomAdapter/IMacAdressDomAdapter";
import cleanElementChildren from "@/helpers/cleanFormNode";
import MacAddressInput from "./MacAddressInput";

export default class MacAddressWidget implements Widget {
  adapter: IMacAdressDomAdapter;

  constructor(document: Document) {
    this.adapter = new MacAddressDomAdapter(document);

    const macAddressCell = this.adapter.findMacAddressInput()?.parentElement;

    if (macAddressCell) {
      cleanElementChildren(macAddressCell);
    }
  }

  get components() {
    const macAddressInput = createComponent(
      "body > form:nth-child(3) > div.data_common.data_common_notitle > table:nth-child(1) > tbody > tr:nth-child(4) > td",
      MacAddressInput(this.adapter.findMacAddressInput()),
    );

    return [macAddressInput];
  }
}
