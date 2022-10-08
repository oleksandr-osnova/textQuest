// loader properties
const LOADING_DURATION = 1000 * 1.5;
const MAX_ADDITIONAL_LOADING_DURATION = 1000 * 1;

// game session keys
const SESSION_STATISTIC_COIN_COUNTER = "coins";
const SESSION_STATISTIC_STEP_COUNTER = "steps";
const SESSION_CURRENT_STEP = "current-step";
const SESSION_CURRENT_SCENARIO = "current-scenario";

// default game values
const DEFAULT_STEP = "init";
const DEFAULT_SCENARIO = "tower";
const DEFAULT_COUNT_OF_HISTORY_RECORDS = 5;

// game event keys
const GAME_EVENT_END = "game:end";
const GAME_EVENT_FIND_COIN = "game:find-coin";
const GAME_EVENT_CHANGE_PAGE = "game:change-page";

// pages keys
const GAME_PAGE_WELCOME = "welcome";
const GAME_PAGE_MAIN = "main";
const GAME_PAGE_END = "end";
const GAME_PAGE_LOADING = "loading";
const GAME_PAGE_HISTORY = "history";

// history keys
const GAME_HISTORY_DB_PRIMARY_KEY = "date";
const GAME_HISTORY_KEYS = new Map([
  ["date", "Дата"],
  ["scenario", "Сценарій"],
  ["steps", "Кроків"],
  ["coins", "Монет"],
]);

export {
  LOADING_DURATION,
  MAX_ADDITIONAL_LOADING_DURATION,
  //
  SESSION_STATISTIC_COIN_COUNTER,
  SESSION_STATISTIC_STEP_COUNTER,
  SESSION_CURRENT_STEP,
  SESSION_CURRENT_SCENARIO,
  //
  DEFAULT_STEP,
  DEFAULT_SCENARIO,
  DEFAULT_COUNT_OF_HISTORY_RECORDS,
  //
  GAME_EVENT_END,
  GAME_EVENT_FIND_COIN,
  GAME_EVENT_CHANGE_PAGE,
  //
  GAME_PAGE_WELCOME,
  GAME_PAGE_MAIN,
  GAME_PAGE_END,
  GAME_PAGE_LOADING,
  GAME_PAGE_HISTORY,
  //
  GAME_HISTORY_DB_PRIMARY_KEY,
  GAME_HISTORY_KEYS,
};
