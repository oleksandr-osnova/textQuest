export default class Session {
  static get coins() {
    console.log(globalThis.env);
    return (
      globalThis.sessionStorage.getItem(env.SESSION_STATISTIC_COIN_COUNTER) || 0
    );
  }

  static set coins(v) {
    return globalThis.sessionStorage.setItem(
      env.SESSION_STATISTIC_COIN_COUNTER,
      v
    );
  }

  static get steps() {
    return (
      globalThis.sessionStorage.getItem(env.SESSION_STATISTIC_STEP_COUNTER) || 0
    );
  }

  static set steps(v) {
    return globalThis.sessionStorage.setItem(
      env.SESSION_STATISTIC_STEP_COUNTER,
      v
    );
  }

  static addCoins(count = 1) {
    Session.coins += count;
  }

  static addSteps(count = 1) {
    Session.steps += count;
  }
}
