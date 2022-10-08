import GameHistory from "../../gameLogic/GameHistory.js";
import Table from "../../components/TableDomElement.js";

export default class HistoryPage {
  static #tableSelector = ".game__interface--history-interface .table";

  static async prepare() {
    const historyList = await GameHistory.prepareForTable();
    const table = new Table({
      caption: "Історія ігор",
      titles: Array.from(env.GAME_HISTORY_KEYS.values()),
      values: historyList,
    });

    document.querySelector(HistoryPage.#tableSelector).outerHTML =
      table.fullTemplate;
  }
}
