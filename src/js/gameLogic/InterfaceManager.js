import {
  LOADING_DURATION,
  MAX_ADDITIONAL_LOADING_DURATION,
} from "../utils/constants.js";

export default class InterfaceManager {
  #currentPage = "welcome";
  #classHidden = "game__interface--hidden";
  #loadingDuration = LOADING_DURATION;
  #pages = new Map([
    [
      "welcome",
      {
        selector: ".game__interface--welcome-interface",
      },
    ],
    [
      "main",
      {
        selector: ".game__interface--main-interface",
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
      Math.floor(Math.random() * MAX_ADDITIONAL_LOADING_DURATION)
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

  async loadingAnimation() {
    const loadingPageInfo = this.getPageInfo("loading");

    this.showPage(document.querySelector(loadingPageInfo.selector));
    // simulate pause for this.#loadingDuration
    await new Promise((res) => {
      setTimeout(res, this.humanizedLoadingDuration);
    });
    this.hidePage(document.querySelector(loadingPageInfo.selector));
  }

  async changePage(newPage = "welcome") {
    // hide old page
    this.togglePageVisibility(
      document.querySelector(this.currentPageInfo.selector)
    );
    await this.loadingAnimation();
    // show new page
    this.togglePageVisibility(
      document.querySelector(this.getPageInfo(newPage).selector)
    );
  }

  bindListeners() {
    const loading = document.querySelector(".game__button--loading");
    loading.addEventListener("click", () => this.changePage("loading"));

    const start = document.querySelector(".game__button--start");
    start.addEventListener("click", () => this.changePage("main"));
  }
}
