import GameEvent from "../gameLogic/GameEvent.js";

function createTowerEvents() {
  const backToHome = new GameEvent(
    "back-to-home",
    env.GAME_SCENARIO_TOWER,
    "Повернутись додому",
    "Закінчити гру на даному етапі",
    {
      type: env.GAME_EVENT_END,
      detail: {
        result: "Спокійний кінець гри",
      },
    }
  );

  const successFinish = new GameEvent(
    "success-finish",
    env.GAME_SCENARIO_TOWER,
    "Закінчити гру",
    "Успішно закінчити гру",
    {
      type: env.GAME_EVENT_END,
      detail: {
        result: "Ви знайшли те що шукали",
      },
    }
  );

  const deadEnd = new GameEvent(
    "dead-end",
    env.GAME_SCENARIO_TOWER,
    "Закінчити гру",
    "Невдало закінчити гру",
    {
      type: env.GAME_EVENT_END,
      detail: {
        result: "Ви загинули",
      },
    }
  );

  const findCoin = new GameEvent(
    "find-coin",
    env.GAME_SCENARIO_TOWER,
    "Знайшли монетку",
    "",
    {
      type: env.GAME_EVENT_FIND_COIN,
      detail: {
        count: 1,
      },
    }
  );

  return { backToHome, successFinish, deadEnd, findCoin };
}

export default createTowerEvents;
