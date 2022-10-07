const LOADING_DURATION = 1000 * 1.5;
const MAX_ADDITIONAL_LOADING_DURATION = 1000 * 1;

const SESSION_STATISTIC_COIN_COUNTER = "coins";
const SESSION_STATISTIC_STEP_COUNTER = "steps";
const SESSION_CURRENT_STEP = "current-step";
const SESSION_CURRENT_SCENARIO = "current-scenario";

const DEFAULT_STEP = "init";
const DEFAULT_SCENARIO = "tower";

const GAME_EVENT_END = "game:end";
const GAME_EVENT_CHANGE_PAGE = "game:change-page";

const GAME_PAGE_WELCOME = "welcome";
const GAME_PAGE_MAIN = "main";
const GAME_PAGE_END = "end";
const GAME_PAGE_LOADING = "loading";

export {
  LOADING_DURATION,
  MAX_ADDITIONAL_LOADING_DURATION,
  SESSION_STATISTIC_COIN_COUNTER,
  SESSION_STATISTIC_STEP_COUNTER,
  SESSION_CURRENT_STEP,
  SESSION_CURRENT_SCENARIO,
  DEFAULT_STEP,
  DEFAULT_SCENARIO,
  GAME_EVENT_END,
  GAME_EVENT_CHANGE_PAGE,
  GAME_PAGE_WELCOME,
  GAME_PAGE_MAIN,
  GAME_PAGE_END,
  GAME_PAGE_LOADING,
};
