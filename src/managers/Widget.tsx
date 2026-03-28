import Widget from "@/interfaces/Widget";
import { createContext } from "react";
import { createPortal } from "react-dom";

const WidgetContext = createContext(null);

export default function WidgetManager({
  widgets,
  iframeDocument,
}: {
  widgets: Widget[];
  iframeDocument: Document;
}) {
  return (
    <>
      {widgets.map((widget, index) => (
        <WidgetContext.Provider value={iframeDocument} key={index}>
          <WidgetPortal widget={widget} />
        </WidgetContext.Provider>
      ))}
    </>
  );
}

function WidgetPortal({ widget }: { widget: Widget }) {
  const iframeDocument = useContext(WidgetContext);
  if (!iframeDocument) return;

  const targetElement = iframeDocument.querySelector(widget.destinationQuery);

  return createPortal(widget.component, targetElement);
}
