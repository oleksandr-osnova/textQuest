import * as env from "./envs.js";
import DB from "./db/DB.js";

globalThis["env"] = env;
globalThis["dbInstance"] = new DB();
