import GameStep from "./GameStep.js";

class GameScenario {
  constructor() {
    this.gameSteps = new Map();
  }

  setCurrentStep(v) {
    this.currentStep = v;
  }

  addGameStep(name, description, tip) {
    const newStep = new GameStep(name, description, tip);
    this.gameSteps.set(newStep[GameStep.primaryKey], newStep);
    return newStep;
  }

  addBound(v, w, c) {
    this.gameSteps
      .get(v[GameStep.primaryKey])
      ["outputs"].push({ step: w, condition: c });
    this.gameSteps
      .get(w[GameStep.primaryKey])
      ["inputs"].push({ step: v, condition: {} });
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
