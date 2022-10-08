import upgradeDB from "./upgradeDB.js";
import initializedDB from "./initializedDB.js";

const indexedDB =
  window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

const DB_NAME = "GameDB";
const DB_VERSION = 1;

export default class DB {
  constructor() {
    console.log("init");
    const openReq = indexedDB.open(DB_NAME, DB_VERSION);
    openReq.onsuccess = function (e) {
      const db = e.target.result;
      if ("setVersion" in db && db.version < DB_VERSION) {
        const setVerReq = db.setVersion(DB_VERSION);
        setVerReq.onsuccess = function (e) {
          console.log("upgrading");
          upgradeDB(DB_VERSION, e.target.result.db);
          initializedDB();
        };
      } else {
        initializedDB();
      }

      db.onversionchange = function () {
        db.close();
        location.reload();
      };
    };
    openReq.onupgradeneeded = function (e) {
      console.log("upgrading");
      upgradeDB(e.newVersion, e.target.result);
    };
    openReq.onerror = function (e) {
      console.log("init error");
    };
    openReq.onblocked = function (e) {
      console.log("init blocked");
    };
  }

  read(stores, fn, done = () => {}) {
    return this.transaction("readonly", stores, fn, done);
  }

  readWrite(stores, fn, done = () => {}) {
    return this.transaction("readwrite", stores, fn, done);
  }

  transaction(mode, stores, fn, done = () => {}) {
    const openReq = indexedDB.open(DB_NAME);
    openReq.onsuccess = function (e) {
      const db = e.target.result;
      const tx = db.transaction(stores, mode);
      tx.oncomplete = function (e) {
        done();
      };
      tx.onabort = function (e) {
        console.log("tx abort");
      };
      tx.onerror = function (e) {
        console.log("tx error");
      };
      fn(tx);
    };
    openReq.onerror = function (e) {
      console.log("open tx error");
    };
  }

  async readAsync(stores, fn, done = () => {}) {
    return this.transactionAsync("readonly", stores, fn, done);
  }

  async readWriteAsync(stores, fn, done = () => {}) {
    return this.transactionAsync("readwrite", stores, fn, done);
  }

  async transactionAsync(mode, stores, fn, done = () => {}) {
    return new Promise(function (resolve, reject) {
      const openReq = indexedDB.open(DB_NAME);
      openReq.onsuccess = function (e) {
        const db = e.target.result;
        const tx = db.transaction(stores, mode);
        tx.oncomplete = function (e) {
          done();
        };
        tx.onabort = function (e) {
          console.log("tx abort");
        };
        tx.onerror = function (e) {
          console.log("tx error");
        };
        resolve(fn(tx));
      };
      openReq.onerror = function (e) {
        reject(e);
        console.log("open tx error");
      };
    });
  }

  deleteDatabase(done = () => {}) {
    const delReq = indexedDB.deleteDatabase(DB_NAME);
    delReq.onsuccess = function (e) {
      done();
    };
    delReq.onerror = function (e) {
      console.log("delete error");
    };
    delReq.onblocked = function (e) {
      console.log("delete blocked");
    };
  }
}
