import React from "react";

export default interface Widget {
  destinationQuery: string;
  init(iframeDoc: Document): React.JSX.Element;
}
