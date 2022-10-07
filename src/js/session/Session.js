export default class Session {
  static get coins() {
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

  static get currentStep() {
    return (
      globalThis.sessionStorage.getItem(env.SESSION_CURRENT_STEP) ||
      env.DEFAULT_STEP
    );
  }

  static set currentStep(v) {
    return globalThis.sessionStorage.setItem(env.SESSION_CURRENT_STEP, v);
  }

  static get currentScenario() {
    return (
      globalThis.sessionStorage.getItem(env.SESSION_CURRENT_STEP) ||
      env.DEFAULT_SCENARIO
    );
  }

  static set currentScenario(v) {
    return globalThis.sessionStorage.setItem(env.SESSION_CURRENT_SCENARIO, v);
  }

  static addCoins(count = 1) {
    Session.coins = parseInt(Session.coins) + count;
  }

  static addSteps(count = 1) {
    Session.steps = parseInt(Session.steps) + count;
  }
}
