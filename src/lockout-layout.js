import { scenarios } from './modules/lockout/data/scenarios.js';
import { initSidebar } from './modules/lockout/ui/sidebar.js';
import { initDevTools } from './modules/lockout/ui/dev-tools.js';

document.addEventListener('DOMContentLoaded', () => {
  initSidebar(scenarios);
  initDevTools();
});
