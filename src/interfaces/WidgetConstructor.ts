import Widget from "./Widget";

type WidgetConstructor = new (document: Document) => Widget;

export { WidgetConstructor };
