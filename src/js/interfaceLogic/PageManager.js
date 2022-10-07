import * as pages from "./pages/index.js";

export default class PageManager {
  static #pages = new Map([
    [
      "welcome",
      {
        selector: ".game__interface--welcome-interface",
        noLoading: true,
      },
    ],
    [
      "main",
      {
        selector: ".game__interface--main-interface",
      },
    ],
    [
      "end",
      {
        class: pages.EndGamePage,
      },
    ],
    [
      "loading",
      {
        selector: ".game__interface--loading-interface",
      },
    ],
  ]);

  static async preparePage(page = "welcome") {
    const pageInfo = PageManager.#pages.get(page);

    pageInfo.class?.prepare && pageInfo.class.prepare();

    await new Promise((res) => {
      setTimeout(res, 1000);
    });

    return true;
  }
}
