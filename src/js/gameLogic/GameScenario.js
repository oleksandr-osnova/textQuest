import Session from "../session/Session.js";
import GameStep from "./GameStep.js";

class GameScenario {
  constructor(gameSteps = new Map()) {
    this.gameSteps = gameSteps;
    this.currentStep = env.DEFAULT_STEP;
  }

  setCurrentStep(v) {
    this.currentStep = v;
  }

  uploadCurrentStep() {
    this.currentStep = Session.currentStep;
  }

  get stepInfo() {
    return this.gameSteps.get(this.currentStep);
  }

  addGameStep(name, title, description, tip, events) {
    const newStep = new GameStep(name, title, description, tip, events);
    this.gameSteps.set(newStep[GameStep.primaryKey], newStep);
    return newStep;
  }

  addBound(v, w, t) {
    const step = this.gameSteps.get(v);
    step["outputs"].push({ step: w, title: t });

    this.gameSteps.set(v, step);
    step.putInstance();
  }

  static initializedDB(version) {
    switch (version) {
      default:
        return function (db) {
          // const store = db.createObjectStore(GameStep.storeName, {
          //     keyPath: GameStep.primaryKey
          // });
          // store.createIndex(GameStep.indexName, GameStep.primaryKey);
          console.log("initializedDB GameScenario script");
        };
    }
  }
}

export default GameScenario;
