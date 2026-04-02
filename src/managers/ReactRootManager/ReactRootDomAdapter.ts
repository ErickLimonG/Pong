export default class ReactRootDomAdapter {
  document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  searchReactRootDiv(): HTMLElement | null {
    return this.document.getElementById("react-root") as HTMLElement;
  }

  createReactRootDiv(): HTMLDivElement {
    const wrapper = this.document.createElement("div");
    wrapper.id = "react-root";

    this.document.body.append(wrapper);

    return wrapper;
  }
}
