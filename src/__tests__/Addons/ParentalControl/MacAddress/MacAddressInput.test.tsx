import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import MacAddressInput from "@/Addons/ParentalControl/MacAddress/MacAddressInput";

function findMacAddressInput() {
  const input = document.createElement("input");
  input.type = "text";
  input.name = "mac";
  input.size = 15;
  input.maxLength = 17;

  return input;
}

afterEach(cleanup);

const macTests = [
  { mac: "00:00:17:23:45:67", vendor: "Oracle" },
  { mac: "00:00:36:45:67:89", vendor: "ATARI CORPORATION" },
  { mac: "00:00:0c:d4:e5:f6", vendor: "Cisco Systems, Inc" },
  { mac: "5a:00:75:71:6c:c9", vendor: "No vendor detected" },
  { mac: "Fc:32:82:7B:E7:E0", vendor: "No vendor detected" },
  { mac: "66:84:f4:31:ef:1d", vendor: "No vendor detected" },
];

test.each(macTests)(
  "Mac $mac should match $vendor",
  async ({ mac, vendor }) => {
    const user = userEvent.setup();
    render(<MacAddressInput originalMacAddressInput={findMacAddressInput()} />);
    await user.type(screen.getByRole("textbox"), mac);
    expect(screen.getByRole("status")).toHaveTextContent(vendor);
  },
);
