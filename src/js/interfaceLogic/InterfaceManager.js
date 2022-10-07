import PageManager from "./PageManager.js";

export default class InterfaceManager {
  #currentPage = "welcome";
  #classHidden = "game__interface--hidden";
  #loadingDuration = env.LOADING_DURATION;
  #pages = new Map([
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
        selector: ".game__interface--end-game-interface",
      },
    ],
    [
      "loading",
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
    const loadingPageInfo = this.getPageInfo("loading");

    this.showPage(document.querySelector(loadingPageInfo.selector));

    await loadingFunction;

    // simulate pause for this.#loadingDuration
    additionalTime &&
      (await new Promise((res) => {
        setTimeout(res, this.humanizedLoadingDuration);
      }));

    this.hidePage(document.querySelector(loadingPageInfo.selector));
  }

  async changePage(newPage = "welcome") {
    const newPageInfo = this.getPageInfo(newPage);

    // hide old page
    this.togglePageVisibility(
      document.querySelector(this.currentPageInfo.selector)
    );

    await this.loadingAnimation(
      PageManager.preparePage(newPage),
      !newPageInfo?.noLoading
    );

    // show new page
    this.togglePageVisibility(document.querySelector(newPageInfo.selector));

    this.#currentPage = newPage;
  }

  bindListeners() {
    const loading = document.querySelector(".button--loading");
    loading.addEventListener("click", () => this.changePage("loading"));

    const end = document.querySelector(".button--end");
    end.addEventListener("click", () => this.changePage("end"));

    const start = document.querySelector(".button--start");
    start.addEventListener("click", () => this.changePage("main"));

    const welcome = document.querySelector(".button--welcome");
    welcome.addEventListener("click", () => this.changePage("welcome"));
  }
}
