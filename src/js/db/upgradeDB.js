import GameStep from "../gameLogic/GameStep.js";

// collect all indexedDB migration
export default function upgradeDB(version, db) {
  GameStep.upgradeDB(version)(db);
}
