export class Router {
  constructor(engine, scenarios) {
    this.engine = engine;
    this.scenarios = scenarios;
  }

  init() {
    // Basic path-based routing
    const path = window.location.pathname;

    if (path === '/die-lockup') {
      this.loadScenarioByName('Die Lockup');
    } else {
      // Default: rely on ScenarioEngine's default initialization (index 0)
      this.engine.init();
    }

    // Handle history popstate if needed
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });
  }

  handleRoute(path) {
    if (path === '/die-lockup') {
      this.loadScenarioByName('Die Lockup');
    } else {
      this.engine.startScenario(0);
    }
  }

  loadScenarioByName(name) {
    const idx = this.scenarios.findIndex(s => s.name === name);
    if (idx !== -1) {
      // Wait a tick for scenario options to be populated if just booting
      setTimeout(() => {
        const scenarioSelector = document.getElementById('scenario-selector');
        if (scenarioSelector) {
          scenarioSelector.value = idx.toString();
        }
        this.engine.startScenario(idx);
      }, 0);
    } else {
      console.warn(`Scenario ${name} not found. Starting default.`);
      this.engine.init();
    }
  }

  // Programmatic navigation
  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute(path);
  }
}
