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
  
  const legend = document.getElementById('target-legend');
  if (legend) {
    legend.style.display = e.target.checked ? 'flex' : 'none';
  }
});

// Hook up QR Modal
const qrBtn = document.getElementById('qr-code-btn');
const qrModal = document.getElementById('qr-modal');
const qrModalClose = document.getElementById('qr-modal-close');

if (qrBtn && qrModal && qrModalClose) {
  qrBtn.addEventListener('click', () => {
    qrModal.style.display = 'flex';
  });
  
  qrModalClose.addEventListener('click', () => {
    qrModal.style.display = 'none';
  });

  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) {
      qrModal.style.display = 'none';
    }
  });
}

// Hook up Tutorial Modal
const tutorialBtn = document.getElementById('tutorial-btn');
const tutorialModal = document.getElementById('tutorial-modal');
const tutorialModalClose = document.getElementById('tutorial-modal-close');

if (tutorialBtn && tutorialModal && tutorialModalClose) {
  tutorialBtn.addEventListener('click', () => {
    tutorialModal.style.display = 'flex';
  });
  
  tutorialModalClose.addEventListener('click', () => {
    tutorialModal.style.display = 'none';
  });

  tutorialModal.addEventListener('click', (e) => {
    if (e.target === tutorialModal) {
      tutorialModal.style.display = 'none';
    }
  });
}
