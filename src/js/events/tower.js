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

export { backToHome, successFinish, deadEnd };
