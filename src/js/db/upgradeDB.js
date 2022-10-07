import GameStep from "../gameLogic/GameStep.js";
import GameEvent from "../gameLogic/GameEvent.js";
import GameHistory from "../gameLogic/GameHistory.js";

// collect all indexedDB migration
export default function upgradeDB(version, db) {
  GameStep.upgradeDB(version)(db);
  GameEvent.upgradeDB(version)(db);
  GameHistory.upgradeDB(version)(db);
}
