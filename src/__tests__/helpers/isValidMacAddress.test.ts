import isValidMacAddress from "@/helpers/isValidMacAddress";
import { expect, test } from "vitest";

test("Mac addresses should be valid", () => {
  expect(isValidMacAddress("9e:37:7c:30:54:5a")).toBe(true);
  expect(isValidMacAddress("69:78:38:29:52:7c")).toBe(true);
  expect(isValidMacAddress("9e-37-7c-30-54-5a")).toBe(true);
  expect(isValidMacAddress("69-78-38-29-52-7c")).toBe(true);
  expect(isValidMacAddress("9e377c30545a")).toBe(true);
  expect(isValidMacAddress("69783829527c")).toBe(true);
  expect(isValidMacAddress("9E:37:7C:30:54:5A")).toBe(true);
  expect(isValidMacAddress("69:78:38:29:52:7C")).toBe(true);
  expect(isValidMacAddress("9E377C30545A")).toBe(true);
  expect(isValidMacAddress("69783829527C")).toBe(true);
  expect(isValidMacAddress("9E-37-7C-30-54-5A")).toBe(true);
  expect(isValidMacAddress("69-78-38-29-52-7C")).toBe(true);
});

test("Mac addresses should be invalid", () => {
  expect(isValidMacAddress("69783829527z")).toBe(false);
  expect(isValidMacAddress("69783829527Z")).toBe(false);
  expect(isValidMacAddress("9e#37#7c#30#54#5a")).toBe(false);
});
