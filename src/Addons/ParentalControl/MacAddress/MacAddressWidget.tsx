import createComponent from "@/helpers/createComponent";
import Widget from "@/interfaces/Widget";
import getVendor from "mac-oui-lookup";
import MacAddressDomAdapter from "./DomAdapter/MacAdressDomAdapter";
import IMacAdressDomAdapter from "./DomAdapter/IMacAdressDomAdapter";
import cleanElementChildren from "@/helpers/cleanFormNode";

export default class MacAddressWidget implements Widget {
  adapter: IMacAdressDomAdapter;

  constructor(document: Document) {
    this.adapter = new MacAddressDomAdapter(document);

    const macAddressCell = this.adapter.findMacAddressInput()?.parentElement;

    if (macAddressCell) {
      cleanElementChildren(macAddressCell);
    }
  }

  createMacInput = () => {
    const [vendor, setVendor] = useState("");
    const inputRef = useRef(null);

    const MacRegex = new RegExp(
      String.raw`\b(?:(?:[a-f\d]{2})(?:[:\-]|)){6}\b`,
      "gmv",
    );

    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target) return;

      target.value = target.value.trim();

      const rawInput = target.value;

      const macAddressInput = this.adapter.findMacAddressInput();

      if (macAddressInput && rawInput) {
        const processedInput = rawInput.replace(/[-:]/g, "");
        (macAddressInput as HTMLInputElement).value = processedInput.trim();
      }

      if (MacRegex.test(rawInput)) {
        const foundVendor = getVendor(rawInput);
        if (foundVendor && foundVendor !== vendor) {
          setVendor(foundVendor);
        }
      } else {
        if (vendor) setVendor("");
      }
    };

    return (
      <>
        <input
          ref={inputRef}
          type="text"
          pattern={MacRegex.source}
          onInput={onInput}
          placeholder="Enter MAC Address"
        />
        <span>{vendor || "No vendor detected"}</span>
      </>
    );
  };

  get components() {
    const macAddressInput = createComponent(
      "body > form:nth-child(3) > div.data_common.data_common_notitle > table:nth-child(1) > tbody > tr:nth-child(4) > td",
      this.createMacInput(),
    );

    return [macAddressInput];
  }
}
