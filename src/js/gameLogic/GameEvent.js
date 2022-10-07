class GameEvent {
  static primaryKey = "key";
  static storeName = "gameEvents";

  constructor(name, title, description, action) {
    this.key = name;
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
}

export default GameEvent;
