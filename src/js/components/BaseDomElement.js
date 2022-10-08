import * as templateParser from "../utils/templateParser.js";

export default class BaseDomElementGenerator {
  substituteValues(template = ``, varList = {}) {
    return templateParser.substituteValues(template, varList);
  }

  getDomElement(template = ``) {
    return templateParser.getDomElement(template);
  }
}
