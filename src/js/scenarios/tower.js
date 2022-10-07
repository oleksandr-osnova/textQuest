import GameScenario from "../gameLogic/GameScenario.js";
import { towerEvents } from "../events/index.js";

const tower = new GameScenario();

tower.addGameStep(
  "init",
  "Ви біля входу в башту",
  "На вигляд ця башта давно покинута",
  "Оберіть перші дію",
  [
    {
      activation: "option",
      eventConfig: towerEvents.backToHome,
    },
  ]
);

tower.addGameStep(
  "floor-1-corridor",
  "Ви потрапили в коридор",
  "В коридорі повно кімнат, а в кінці видно сходи на інші поверхи",
  "Спробуйте інші поверхи"
);

tower.addGameStep(
  "floor-1-room-1",
  "Ви потрапили в кімнату №1",
  "Пуста кімната",
  "Спробуйте інші кімнати"
);

tower.addGameStep(
  "floor-1-room-2",
  "Ви потрапили в кімнату №2",
  "Пуста кімната",
  "Спробуйте інші кімнати"
);

tower.addGameStep(
  "floor-2-corridor",
  "Ви потрапили в коридор на другому поверсі",
  "В коридорі повно кімнат, а в кінці видно сходи на інші поверхи",
  "Спробуйте інші поверхи"
);

tower.addGameStep(
  "floor-2-room-1",
  "Ви потрапили в кімнату №1",
  "Після входу в кімнату на вас впав шматок стелі і ви загинули",
  "Спробуйте інші кімнати",
  [
    {
      activation: "option",
      eventConfig: towerEvents.deadEnd,
    },
  ]
);

tower.addGameStep(
  "floor-2-room-2",
  "Ви потрапили в кімнату №2",
  "Ви знайли скарб, вітаю",
  "Спробуйте інші кімнати",
  [
    {
      activation: "option",
      eventConfig: towerEvents.successFinish,
    },
  ]
);

tower.addBound("init", "floor-1-corridor", "Зайти в башту");
tower.addBound("floor-1-corridor", "floor-1-room-1", "Перевірити 1 кімнату");
tower.addBound("floor-1-room-1", "floor-1-corridor", "Повернутись у коридор");
tower.addBound("floor-1-room-2", "floor-1-corridor", "Повернутись у коридор");
tower.addBound("floor-1-corridor", "floor-1-room-2", "Перевірити 2 кімнату");
tower.addBound("floor-1-corridor", "floor-2-corridor", "Піднятись на 2 поверх");
tower.addBound("floor-2-corridor", "floor-2-room-1", "Перевірити 1 кімнату");
tower.addBound("floor-2-corridor", "floor-2-room-2", "Перевірити 2 кімнату");

export default tower;
