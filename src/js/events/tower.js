import GameEvent from "../gameLogic/GameEvent.js";

const backToHome = new GameEvent(
  "back-to-home",
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
  "Закінчити гру",
  "Невдало закінчити гру",
  {
    type: env.GAME_EVENT_END,
    detail: {
      result: "Ви загинули",
    },
  }
);

const findCoin = new GameEvent("find-coin", "Знайшли монетку", "", {
  type: env.GAME_EVENT_FIND_COIN,
  detail: {
    count: 1,
  },
});

export { backToHome, successFinish, deadEnd, findCoin };
