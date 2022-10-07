import * as env from "./env.js";
import DB from "./db/DB.js";

globalThis["env"] = env;
globalThis["dbInstance"] = new DB();
