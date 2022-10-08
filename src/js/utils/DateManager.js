export default class DateManager {
  #date;

  constructor(date) {
    this.#date = new Date(date);
  }

  get seconds() {
    return String(this.#date.getSeconds()).padStart(2, 0);
  }

  get minutes() {
    return String(this.#date.getMinutes()).padStart(2, 0);
  }

  get hours() {
    return String(this.#date.getHours()).padStart(2, 0);
  }

  get days() {
    return String(this.#date.getDate()).padStart(2, 0);
  }

  get months() {
    return String(parseInt(this.#date.getMonth()) + 1).padStart(2, 0);
  }

  get years() {
    return this.#date.getFullYear();
  }

  get humanFormat() {
    return `${this.years}-${this.months}-${this.days} ${this.hours}:${this.minutes}:${this.seconds}`;
  }
}
