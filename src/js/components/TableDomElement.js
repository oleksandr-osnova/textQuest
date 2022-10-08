import BaseDomElement from "./BaseDomElement.js";

export default class TableDomElement extends BaseDomElement {
  #parts = new Map([
    [
      "table",
      {
        template: `<table class="table">\${value}</table>`,
      },
    ],
    [
      "caption",
      {
        template: `<caption class="table__caption">\${value}</caption>`,
      },
    ],
    [
      "thead",
      {
        template: `<thead class="table__head">\${value}</thead>`,
      },
    ],
    [
      "tbody",
      {
        template: `<tbody class="table__body">\${value}</tbody>`,
      },
    ],
    [
      "tr",
      {
        template: `<tr class="table__tr">\${value}</tr>`,
      },
    ],
    [
      "td",
      {
        template: `<td class="table__td">\${value}</td>`,
      },
    ],
  ]);

  config = {
    caption: "",
    titles: [""],
    values: [[""]],
  };

  constructor(config) {
    super();
    this.config = config;
  }

  prepareCaption() {
    if (!this.config.caption.length) {
      return ``;
    }

    return this.substituteValues(this.#parts.get("caption").template, {
      value: this.config.caption,
    });
  }

  prepareTd(value) {
    return this.substituteValues(this.#parts.get("td").template, {
      value,
    });
  }

  prepareTr(value) {
    return this.substituteValues(this.#parts.get("tr").template, {
      value,
    });
  }

  prepareHead() {
    let tds = this.config.titles.reduce(
      (prev, curr) => prev + this.prepareTd(curr),
      ``
    );
    let tr = this.prepareTr(tds);

    return this.substituteValues(this.#parts.get("thead").template, {
      value: tr,
    });
  }

  prepareBody() {
    let trs = this.config.values.reduce((prev, curr) => {
      let tds = curr.reduce((prev, curr) => prev + this.prepareTd(curr), ``);
      return prev + this.prepareTr(tds);
    }, ``);

    return this.substituteValues(this.#parts.get("tbody").template, {
      value: trs,
    });
  }

  get fullTemplate() {
    let caption = this.prepareCaption();
    let head = this.prepareHead();
    let body = this.prepareBody();

    return this.substituteValues(this.#parts.get("table").template, {
      value: caption + head + body,
    });
  }

  get domElement() {
    return this.getDomElement(this.getTemplate);
  }
}
