class GameEvent {
  static primaryKey = "key";
  static storeName = "gameEvents";
  static indexKey = "scenario";

  constructor(name, scenario, title, description, action) {
    this.key = name;
    this.scenario = scenario;
    this.title = title;
    this.description = description;
    this.action = action;

    this.putInstance();
  }

  static upgradeDB(version) {
    switch (version) {
      default:
        return function (db) {
          const store = db.createObjectStore(GameEvent.storeName, {
            keyPath: GameEvent.primaryKey,
          });
          store.createIndex(GameEvent.indexName, GameEvent.primaryKey);
          store.createIndex(GameEvent.secondIndexName, GameEvent.indexKey);
        };
    }
  }

  putInstance() {
    const self = this;
    dbInstance.readWrite(
      [GameEvent.storeName],
      function (tx) {
        tx.objectStore(GameEvent.storeName).put(self);
      },
      function () {
        console.log("saved GameEvent");
      }
    );
  }

  static get indexName() {
    return `${GameEvent.primaryKey}_idx`;
  }

  static get secondIndexName() {
    return `${GameEvent.indexKey}_idx`;
  }
}

export default GameEvent;
