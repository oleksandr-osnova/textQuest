import * as env from "./envs.js";
import DB from "./db/DB.js";
import InterfaceManager from "./interfaceLogic/InterfaceManager.js";

globalThis["env"] = env;
globalThis["dbInstance"] = new DB();

new InterfaceManager();
