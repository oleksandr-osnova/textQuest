import "./env.js";
import "./bootstrap.js";

import InterfaceManager from "./interfaceLogic/InterfaceManager.js";
import scenario from "./scenarios/index.js";

globalThis["scenario"] = scenario;
scenario.uploadCurrentStep();
new InterfaceManager();
