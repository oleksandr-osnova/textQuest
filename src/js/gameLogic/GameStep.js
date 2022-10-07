import DB from "../db/DB.js";

class GameStep {
  static primaryKey = "key";
  static storeName = "gameSteps";
  #limitOfOutputs = 4;

  constructor(name, description, tip) {
    this.key = name;
    this.description = description;
    this.tip = tip;
    this.inputs = [];
    this.outputs = [];
    this.events = [];

    this.saveInstance();
  }

  static upgradeDB(version) {
    switch (version) {
      default:
        return function (db) {
          const store = db.createObjectStore(GameStep.storeName, {
            keyPath: GameStep.primaryKey,
          });
          store.createIndex(GameStep.indexName, GameStep.primaryKey);
        };
    }
  }

  saveInstance() {
    const self = this;
    dbInstance.readWrite(
      [GameStep.storeName],
      function (tx) {
        tx.objectStore(GameStep.storeName).put(self);
      },
      function () {
        console.log("saved GameStep");
      }
    );
  }

  get countOfOutputs() {
    return this.outputs.length;
  }

  static get indexName() {
    return `${GameStep.primaryKey}_idx`;
  }

  addInput(input) {
    this.inputs.push(input);
  }

  addOutput(output) {
    if (this.countOfOutputs < this.#limitOfOutputs) {
      this.outputs.push(output);
    } else {
      throw new Error("Limit of outputs has reached");
    }
  }
}

export default GameStep;
