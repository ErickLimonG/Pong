import ReactDOM from "react-dom/client";
import ReactRootDomAdapter from "./ReactRootDomAdapter";

export default class ReactRootManager {
  adapter: ReactRootDomAdapter;

  constructor(document: Document) {
    this.adapter = new ReactRootDomAdapter(document);
  }

  removeReactRootIfPresent() {
    const existingWrapper = this.adapter.searchReactRootDiv();
    if (existingWrapper) {
      // TODO: check if not unmounting root incurs performance penalty
      existingWrapper.remove();
    }
  }

  createReactRoot(): ReactDOM.Root {
    this.removeReactRootIfPresent();
    const rootDiv = this.adapter.createReactRootDiv();
    const root = ReactDOM.createRoot(rootDiv);
    return root;
  }
}
