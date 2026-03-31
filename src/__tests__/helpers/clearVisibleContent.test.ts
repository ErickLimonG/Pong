import clearVisibleContent from "@/helpers/clearVisibleContent";
import { getAllByRole } from "@testing-library/dom";
import { expect, test } from "vitest";

function getComponentWithChildren() {
  const div = document.createElement("div");
  div.dataset.testid = "component-with-children";

  const firstInput = document.createElement("input");
  const txt = document.createTextNode(":");
  const secondInput = document.createElement("input");

  div.append(firstInput);
  div.append(txt);
  div.append(secondInput);

  return div;
}

function getMockDom() {
  const container = document.createElement("div");
  return container;
}

test("Hides all elements", () => {
  const mockDom = getMockDom();
  const div = getComponentWithChildren();

  mockDom.append(div);
  clearVisibleContent(div);

  const inputs = getAllByRole(mockDom, "textbox", { hidden: true });

  inputs.forEach((input) => {
    expect(input).not.toBeVisible();
  });
});
