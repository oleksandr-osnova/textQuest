import * as pages from "./pages/index.js";

export default class PageManager {
  static #pages = new Map([
    [
      env.GAME_PAGE_MAIN,
      {
        class: pages.MainPage,
      },
    ],
    [
      env.GAME_PAGE_END,
      {
        class: pages.EndGamePage,
      },
    ],
  ]);

  static async preparePage(page = env.GAME_PAGE_WELCOME, ...rest) {
    const pageInfo = PageManager.#pages.get(page);

    pageInfo.class?.prepare && pageInfo.class.prepare(...rest);

    return true;
  }
}
