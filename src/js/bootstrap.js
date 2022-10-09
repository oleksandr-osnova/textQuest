import "./db/DB.js";
import GameScenario from "./gameLogic/GameScenario.js";
import InterfaceManager from "./interfaceLogic/InterfaceManager.js";

(async function () {
  globalThis["scenario"] = await GameScenario.uploadScenario();
})();

new InterfaceManager();
