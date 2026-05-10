import { panelData } from './panelData.js';
import { Logger } from './modules/Logger.js';
import { ScenarioEngine } from './modules/ScenarioEngine.js';
import { ControlManager } from './modules/ControlManager.js';
import { PanelRenderer } from './modules/PanelRenderer.js';

const grid = document.getElementById('panel-grid');
const logContent = document.getElementById('log-content');
const trainingInstruction = document.getElementById('training-instruction');
const scenarioSelector = document.getElementById('scenario-selector');
const resetBtn = document.getElementById('reset-scenario-btn');
const highlightCb = document.getElementById('highlight-targets-cb');

// Initialize modules
const logger = new Logger(logContent);
const engine = new ScenarioEngine(trainingInstruction, scenarioSelector, logger, grid);
const controlManager = new ControlManager(logger, engine);
const renderer = new PanelRenderer(grid, panelData, controlManager);

// Boot
renderer.render();
engine.init();

// Hook up reset button
resetBtn.addEventListener('click', () => {
  const idx = parseInt(scenarioSelector.value);
  engine.startScenario(idx);
});

// Hook up highlight toggle
highlightCb.addEventListener('change', (e) => {
  engine.setHighlightState(e.target.checked);
});
