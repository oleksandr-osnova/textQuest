import GameScenario from "../gameLogic/GameScenario.js";

// collect all indexedDB migration
export default function initializedDB(version, db) {
  GameScenario.initializedDB(version)(db);
}
