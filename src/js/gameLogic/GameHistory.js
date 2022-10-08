import Session from "../session/Session.js";
import DateManager from "../utils/DateManager.js";

class GameHistory {
  static primaryKey = env.GAME_HISTORY_DB_PRIMARY_KEY;
  static storeName = "gameHistories";

  constructor() {
    console.log("create GameHistory");
    this.date = new Date().toISOString();
    this.value = new Map([
      ["coins", Session.coins],
      ["steps", Session.steps],
      ["scenario", Session.currentScenario],
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

  static async getHistory() {
    return await dbInstance.readAsync(
      [GameHistory.storeName],
      async function (tx) {
        return new Promise(function (resolve, reject) {
          tx.objectStore(GameHistory.storeName).getAll().onsuccess = (e) => {
            resolve(e.target.result);
          };
        });
      },
      function () {
        console.log("GameHistory");
      }
    );
  }

  static async prepareForTable() {
    const data = await this.getHistory();

    return data.map((el) => {
      const keys = Array.from(env.GAME_HISTORY_KEYS.keys());
      const arr = keys
        .filter((e) => e !== env.GAME_HISTORY_DB_PRIMARY_KEY)
        .map((e) => el.value.get(e));

      return [new DateManager(el.date).humanFormat, ...arr];
    });
  }

  static get indexName() {
    return `${GameHistory.primaryKey}_idx`;
  }
}

export default GameHistory;
