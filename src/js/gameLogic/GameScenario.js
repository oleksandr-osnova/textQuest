import Session from "../session/Session.js";
import GameStep from "./GameStep.js";
import defaultScenario from "../scenarios/index.js";

class GameScenario {
  constructor(scenario = env.DEFAULT_SCENARIO, gameSteps = new Map()) {
    this.scenario = scenario;
    this.gameSteps = gameSteps;
    this.currentStep = env.DEFAULT_STEP;
  }

  setCurrentStep(v) {
    this.currentStep = v;
  }

  uploadCurrentStep() {
    this.currentStep = Session.currentStep;
  }

  static async uploadScenario() {
    const steps = await GameScenario.getScenarioSteps(env.DEFAULT_SCENARIO);

    if (steps.length !== 0) {
      const stepsMap = new Map(
        steps.map((el) => [el[GameStep.primaryKey], el])
      );
      const scenarioInstance = new GameScenario(env.DEFAULT_SCENARIO, stepsMap);
      scenarioInstance.uploadCurrentStep();
      return await scenarioInstance;
    } else {
      return await defaultScenario();
    }
  }

  static async getScenarioSteps(scenario = env.DEFAULT_SCENARIO) {
    return await dbInstance.readAsync(
      [GameStep.storeName],
      async function (tx) {
        return new Promise(function (resolve, reject) {
          tx
            .objectStore(GameStep.storeName)
            .index(GameStep.secondIndexName)
            .getAll(IDBKeyRange.only(scenario)).onsuccess = (e) => {
            resolve(e.target.result);
          };
        });
      },
      function () {
        console.log("GameScenario");
      }
    );
  }

  get stepInfo() {
    return this.gameSteps.get(this.currentStep);
  }

  addGameStep(name, title, description, tip, events) {
    const newStep = new GameStep(
      name,
      this.scenario,
      title,
      description,
      tip,
      events
    );
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
        return function () {
          console.log("initializedDB GameScenario script");
        };
    }
  }
}

export default GameScenario;
