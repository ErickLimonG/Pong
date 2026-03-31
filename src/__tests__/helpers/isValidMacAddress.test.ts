import isValidMacAddress from "@/helpers/isValidMacAddress";
import { expect, test } from "vitest";

const validMacTestCases = [
  { mac: "9e:37:7c:30:54:5a", isValid: true },
  { mac: "69:78:38:29:52:7c", isValid: true },
  { mac: "9e-37-7c-30-54-5a", isValid: true },
  { mac: "69-78-38-29-52-7c", isValid: true },
  { mac: "9e377c30545a", isValid: true },
  { mac: "69783829527c", isValid: true },
  { mac: "9E:37:7C:30:54:5A", isValid: true },
  { mac: "69:78:38:29:52:7C", isValid: true },
  { mac: "9E377C30545A", isValid: true },
  { mac: "69783829527C", isValid: true },
  { mac: "9E-37-7C-30-54-5A", isValid: true },
  { mac: "69-78-38-29-52-7C", isValid: true },
];

const invalidMacTestCases = [
  { mac: "69783829527z", isValid: false },
  { mac: "69783829527Z", isValid: false },
  { mac: "9e#37#7c#30#54#5a", isValid: false },
  { mac: "1245234", isValid: false },
  { mac: "abce", isValid: false },
];

test.each(validMacTestCases)("Mac $mac should be valid", ({ mac, isValid }) => {
  expect(isValidMacAddress(mac)).toBe(isValid);
});

test.each(invalidMacTestCases)(
  "Mac $mac should be invalid",
  ({ mac, isValid }) => {
    expect(isValidMacAddress(mac)).toBe(isValid);
  },
);
