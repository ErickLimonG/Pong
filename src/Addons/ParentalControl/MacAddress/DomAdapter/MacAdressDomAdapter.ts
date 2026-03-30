import IMacAdressDomAdapter from "./IMacAdressDomAdapter";

export default class MacAddressDomAdapter implements IMacAdressDomAdapter {
  document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  findMacAddressInput() {
    return this.document.querySelector(
      "body > form:nth-child(3) > div.data_common.data_common_notitle > table:nth-child(1) > tbody > tr:nth-child(4) > td > input[type=text]",
    );
  }
}
