import PageManager from "./PageManager.js";

export default class InterfaceManager {
  #currentPage = env.GAME_PAGE_WELCOME;
  #classHidden = "game__interface--hidden";
  #loadingDuration = env.LOADING_DURATION;
  #pages = new Map([
    [
      env.GAME_PAGE_WELCOME,
      {
        selector: ".game__interface--welcome-interface",
        noLoading: true,
      },
    ],
    [
      env.GAME_PAGE_MAIN,
      {
        selector: ".game__interface--main-interface",
      },
    ],
    [
      env.GAME_PAGE_END,
      {
        selector: ".game__interface--end-game-interface",
      },
    ],
    [
      env.GAME_PAGE_LOADING,
      {
        selector: ".game__interface--loading-interface",
      },
    ],
  ]);

  constructor() {
    this.bindListeners();
  }

  get humanizedLoadingDuration() {
    return (
      this.#loadingDuration +
      Math.floor(Math.random() * env.MAX_ADDITIONAL_LOADING_DURATION)
    );
  }

  showPage(el) {
    el.classList.remove(this.#classHidden);
  }

  hidePage(el) {
    el.classList.add(this.#classHidden);
  }

  togglePageVisibility(el) {
    el.classList.toggle(this.#classHidden);
  }

  getPageInfo(page) {
    return this.#pages.get(page);
  }

  get currentPageInfo() {
    return this.getPageInfo(this.#currentPage);
  }

  async loadingAnimation(
    loadingFunction = new Promise((res) => {
      res();
    }),
    additionalTime = false
  ) {
    const loadingPageInfo = this.getPageInfo(env.GAME_PAGE_LOADING);

    this.showPage(document.querySelector(loadingPageInfo.selector));

    await loadingFunction;

    // simulate pause for this.#loadingDuration
    additionalTime &&
      (await new Promise((res) => {
        setTimeout(res, this.humanizedLoadingDuration);
      }));

    this.hidePage(document.querySelector(loadingPageInfo.selector));
  }

  async changePage(newPage = env.GAME_PAGE_WELCOME, ...rest) {
    const newPageInfo = this.getPageInfo(newPage);

    // hide old page
    this.togglePageVisibility(
      document.querySelector(this.currentPageInfo.selector)
    );

    await this.loadingAnimation(
      PageManager.preparePage(newPage, ...rest),
      !newPageInfo?.noLoading
    );

    // show new page
    this.togglePageVisibility(document.querySelector(newPageInfo.selector));

    this.#currentPage = newPage;
  }

  bindListeners() {
    const startB = document.querySelector(".button--start");
    startB.addEventListener("click", () =>
      this.changePage(env.GAME_PAGE_MAIN, true)
    );

    const continueB = document.querySelector(".button--continue");
    continueB.addEventListener("click", () =>
      this.changePage(env.GAME_PAGE_MAIN)
    );

    const welcomeB = document.querySelector(".button--welcome");
    welcomeB.addEventListener("click", () =>
      this.changePage(env.GAME_PAGE_WELCOME)
    );

    globalThis.addEventListener(env.GAME_EVENT_CHANGE_GAME, (e) => {
      console.log(e.detail);
      const event = new CustomEvent(env.GAME_EVENT_CHANGE_GAME, {
        detail: {
          ...e.detail,
          newPage: env.GAME_PAGE_END,
        },
      });
      this.changePage(env.GAME_PAGE_END, e.detail.result);
    });
  }
}
