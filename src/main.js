import { panelData } from './panelData.js';
import { Logger } from './modules/Logger.js';
import { ScenarioEngine } from './modules/ScenarioEngine.js';
import { ControlManager } from './modules/ControlManager.js';
import { PanelRenderer } from './modules/PanelRenderer.js';
import { UIController } from './modules/UIController.js';
import { Router } from './modules/Router.js';
import { scenariosData } from './scenarios/index.js';

const grid = document.getElementById('panel-grid');
const logContent = document.getElementById('log-content');
const trainingInstruction = document.getElementById('training-instruction');
const scenarioSelector = document.getElementById('scenario-selector');

// Initialize Core Modules
const logger = new Logger(logContent);
const engine = new ScenarioEngine(trainingInstruction, scenarioSelector, logger, grid);
const controlManager = new ControlManager(logger, engine);
const renderer = new PanelRenderer(grid, panelData, controlManager);

// Initialize UI and Router
const uiController = new UIController(engine);
const router = new Router(engine, scenariosData);

// Boot
renderer.render();
uiController.init();
router.init();
