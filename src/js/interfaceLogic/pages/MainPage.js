import Session from "../../session/Session.js";
import { substituteValues } from "../../utils/templateParser.js";

export default class MainGamePage {
  static #titleSelector = ".step-info__title";
  static #descriptionSelector = ".step-info__description";
  static #optionsSelector = ".step-user-options";
  static #isListenersBounded = false;

  static #templateOptionItem = `<div class="step-user-options__item" data-\${attributeKey}='\${attributeValue}'>
    <div class="step-user-options__text">\${title}</div>
  </div>`;

  static getOptionsItemsTemplate(options, events = []) {
    let result = ``;

    options.forEach((el) => {
      result += substituteValues(
        MainGamePage.#templateOptionItem,
        new Map([
          ["attributeKey", "next-step"],
          ["attributeValue", el.step],
          ["title", el.title],
        ])
      );
    });

    events
      .filter((event) => event.activation === "option")
      .forEach((el) => {
        result += substituteValues(
          MainGamePage.#templateOptionItem,
          new Map([
            ["attributeKey", "trigger"],
            ["attributeValue", JSON.stringify(el.eventConfig.action)],
            ["title", el.eventConfig.title],
          ])
        );
      });

    return result;
  }

  static resetGame() {
    Session.coins = 0;
    Session.steps = 0;
    Session.currentStep = env.DEFAULT_STEP;
    Session.currentScenario = env.DEFAULT_SCENARIO;
    scenario.setCurrentStep(env.DEFAULT_STEP);
  }

  static prepare(newGame = false) {
    if (newGame) {
      MainGamePage.resetGame();
    }

    !MainGamePage.#isListenersBounded && MainGamePage.bindListeners();

    MainGamePage.prepareStep();
  }

  static updatePageData() {
    const currentStepInfo = scenario.stepInfo;

    document.querySelector(MainGamePage.#titleSelector).innerHTML =
      currentStepInfo.title;
    document.querySelector(MainGamePage.#descriptionSelector).innerHTML =
      currentStepInfo.description;
    document.querySelector(MainGamePage.#optionsSelector).innerHTML =
      MainGamePage.getOptionsItemsTemplate(
        currentStepInfo.outputs,
        currentStepInfo.events
      );
  }

  static checkAutoEvents() {
    const currentStepInfo = scenario.stepInfo;

    currentStepInfo.events
      .filter((event) => event.activation === "auto")
      .forEach((el) => {
        if (Math.random() < el.chance) {
          const event = new CustomEvent(el.eventConfig.action.type, {
            detail: {
              ...el.eventConfig.action.detail,
            },
          });
          globalThis.dispatchEvent(event);
        }
      });
  }

  static bindListeners() {
    MainGamePage.#isListenersBounded = true;
    document
      .querySelector(MainGamePage.#optionsSelector)
      .addEventListener("click", (e) => {
        if (e.target.dataset?.nextStep) {
          const { nextStep } = e.target.dataset;
          scenario.setCurrentStep(nextStep);
          MainGamePage.prepareStep();
          Session.addSteps(1);
          Session.currentStep = nextStep;
        } else if (e.target.dataset?.trigger) {
          const parsedData = JSON.parse(e.target.dataset?.trigger);
          const event = new CustomEvent(parsedData.type, {
            detail: parsedData.detail,
          });
          globalThis.dispatchEvent(event);
        }
      });

    globalThis.addEventListener(env.GAME_EVENT_END, (e) => {
      const event = new CustomEvent(env.GAME_EVENT_CHANGE_PAGE, {
        detail: {
          ...e.detail,
          newPage: env.GAME_PAGE_END,
        },
      });
      globalThis.dispatchEvent(event);
    });

    globalThis.addEventListener(env.GAME_EVENT_FIND_COIN, (e) => {
      Session.addCoins(e.detail.count);
    });
  }

  static prepareStep() {
    MainGamePage.updatePageData();
    MainGamePage.checkAutoEvents();
  }
}
