import isValidMacAddress from "@/helpers/isValidMacAddress";
import getVendor from "mac-oui-lookup";

export default function MacAddressInput(
  originalMacAddressInput: Element | null,
) {
  const [vendor, setVendor] = useState<string | null>(null);

  const updateVendor = (macAddressInput: string) => {
    if (!isValidMacAddress(macAddressInput)) {
      setVendor(null);
      return;
    }

    const foundVendor = getVendor(macAddressInput);
    if (foundVendor !== vendor) {
      setVendor(foundVendor);
    }
  };

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value;

    if (originalMacAddressInput && rawInput) {
      const normalizedInput = rawInput.replace(/[-:]/g, "").trim();
      // sync with original input
      (originalMacAddressInput as HTMLInputElement).value = normalizedInput;
      updateVendor(normalizedInput);
    }
  };

  return (
    <>
      <input type="text" onInput={onInput} placeholder="Enter MAC Address" />
      <span>{vendor || "No vendor detected"}</span>
    </>
  );
}
