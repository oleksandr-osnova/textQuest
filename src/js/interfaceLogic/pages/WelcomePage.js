import Session from "../../session/Session.js";

export default class WelcomePage {
  static prepare() {
    const continueB = document.querySelector(".button--continue");

    if (Session.currentStep === env.DEFAULT_STEP) {
      continueB.classList.add("button--hidden");
    } else {
      continueB.classList.remove("button--hidden");
    }
  }
}
