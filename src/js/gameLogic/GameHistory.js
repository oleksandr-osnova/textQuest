import Session from "../session/Session.js";

class GameHistory {
  static primaryKey = "date";
  static storeName = "gameHistories";

  constructor() {
    console.log("create GameHistory");
    this.date = new Date().toISOString();
    this.value = new Map([
      ["Монет", Session.coins],
      ["Кроків", Session.steps],
      ["Сценарій", Session.currentScenario],
    ]);

    this.checkRecordsLimit();
    this.putInstance();
  }

  static upgradeDB(version) {
    switch (version) {
      default:
        return function (db) {
          const store = db.createObjectStore(GameHistory.storeName, {
            keyPath: GameHistory.primaryKey,
          });
          store.createIndex(GameHistory.indexName, GameHistory.primaryKey);
        };
    }
  }

  checkRecordsLimit() {
    dbInstance.readWrite(
      [GameHistory.storeName],
      function (tx) {
        const store = tx.objectStore(GameHistory.storeName);
        const countReq = store.count();

        countReq.onsuccess = (e) => {
          const keysReq = store.getAllKeys();
          keysReq.onsuccess = (e) => {
            if (countReq.result >= env.DEFAULT_COUNT_OF_HISTORY_RECORDS) {
              const countRecordsToDelete = Math.max(
                countReq.result - env.DEFAULT_COUNT_OF_HISTORY_RECORDS,
                1
              );
              const index = store.index(GameHistory.indexName);
              let i = 0;
              index.openKeyCursor().onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor && i < countRecordsToDelete) {
                  store.delete(cursor.primaryKey);
                  i++;
                  cursor.continue();
                }
              };
            }
          };
        };
      },
      function () {
        console.log("delete extra GameHistories");
      }
    );
  }

  putInstance() {
    const self = this;
    dbInstance.readWrite(
      [GameHistory.storeName],
      function (tx) {
        tx.objectStore(GameHistory.storeName).put(self);
      },
      function () {
        console.log("saved GameHistory");
      }
    );
  }

  static get indexName() {
    return `${GameHistory.primaryKey}_idx`;
  }
}

export default GameHistory;
