import toHtml from "../../utils/templateParser.js";
import Session from "../../session/Session.js";
import { insertReplacement } from "../../utils/templateParser.js";

export default class EndGamePage {
  static #statisticSelector = ".end-game__statistics";
  static #descriptionSelector = ".end-game__description";
  static #statisticItems = new Map([
    ["Монет", Session.coins],
    ["Кроків", Session.steps],
  ]);

  static #templateStatisticTitle = `<div class="end-game__statistics-title">Статистика</div>`;
  static #templateUl = `<ul class="statistic-list">\${items}</ul>`;
  static #templateLi = `<li class="statistic-list__item"><b>\${key}:</b>&nbsp;\${value}</li>`;

  static #templateDescription = `<b>Результат :</b>&nbsp;\${result}`;

  static get getStatisticBlock() {
    return toHtml(EndGamePage.getStatisticTemplate());
  }

  static getStatisticTemplate() {
    let items = ``,
      result = ``;
    console.log(EndGamePage.#statisticItems);
    EndGamePage.#statisticItems.forEach((value, key) => {
      console.log(key, value);
      items += insertReplacement(
        EndGamePage.#templateLi,
        new Map([
          ["key", key],
          ["value", typeof value === "function" ? value() : value],
        ])
      );
    });

    result += EndGamePage.#templateStatisticTitle;
    result += insertReplacement(
      EndGamePage.#templateUl,
      new Map([["items", items]])
    );

    return result;
  }

  static prepare(result) {
    document.querySelector(EndGamePage.#descriptionSelector).innerHTML =
      insertReplacement(
        EndGamePage.#templateDescription,
        new Map([["result", result]])
      );

    document.querySelector(EndGamePage.#statisticSelector).innerHTML =
      EndGamePage.getStatisticTemplate();
  }
}
