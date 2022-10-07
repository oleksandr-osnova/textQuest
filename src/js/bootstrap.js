import * as env from "./envs.js";
import InterfaceManager from "./interfaceLogic/InterfaceManager.js";

globalThis["env"] = env;

new InterfaceManager();
