import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { panelData } from '../panelData.js';
import { Logger } from '../modules/Logger.js';
import { ScenarioEngine } from '../modules/ScenarioEngine.js';
import { ControlManager } from '../modules/ControlManager.js';
import { PanelRenderer } from '../modules/PanelRenderer.js';
import { UIController } from '../modules/UIController.js';
import { scenariosData } from '../scenarios/index.js';
import '../style.css'; // Load original panel styles

export default function PanelSimulator() {
  useEffect(() => {
    // Check if already initialized to prevent double render in React Strict Mode
    if (document.getElementById('panel-grid').innerHTML !== '') return;

    const grid = document.getElementById('panel-grid');
    const logContent = document.getElementById('log-content');
    const trainingInstruction = document.getElementById('training-instruction');
    const scenarioSelector = document.getElementById('scenario-selector');

    // Initialize Core Modules
    const logger = new Logger(logContent);
    const engine = new ScenarioEngine(trainingInstruction, scenarioSelector, logger, grid);
    const controlManager = new ControlManager(logger, engine);
    const renderer = new PanelRenderer(grid, panelData, controlManager);

    // Initialize UI
    const uiController = new UIController(engine);

    // Initialize routing and scenarios
    engine.init();

    // Boot
    renderer.render();
    uiController.init();

    return () => {
      // Cleanup if necessary
      grid.innerHTML = '';
      logContent.innerHTML = '';
    };
  }, []);

  return (
    <div className="panel-simulator-wrapper bg-[var(--bg-dark)] w-screen overflow-hidden text-[var(--text-main)] font-['Inter'] relative">
      <div className="status-area">
        <div className="training-module" id="training-module">
          <div className="training-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <Link to="/" className="flex items-center gap-2 text-[var(--neon-blue)] hover:text-white transition-colors text-sm font-bold uppercase tracking-wider no-underline" style={{textDecoration: 'none'}}>
                <span>←</span> Home
              </Link>
              <div style={{width: '1px', height: '15px', backgroundColor: 'rgba(255,255,255,0.2)'}}></div>
              <span className="training-title font-['Share_Tech_Mono'] text-lg md:text-xl bg-gradient-to-br from-[var(--neon-blue)] to-[#b400ff] bg-clip-text text-transparent tracking-widest uppercase m-0 font-bold" style={{margin: 0}}>PANEL SIMULATOR</span>
            </div>
            <div className="training-controls">
              <label className="highlight-toggle">
                <input type="checkbox" id="highlight-targets-cb" defaultChecked /> Show Targets
              </label>
              <select id="scenario-selector" className="scenario-selector"></select>
              <button id="reset-scenario-btn" className="reset-btn">Reset</button>
              <button id="tutorial-btn" className="tutorial-btn" title="How to use the simulator">❓ Help</button>
            </div>
          </div>
          <div className="training-instruction" id="training-instruction">
            Waiting for scenario initialization...
          </div>
        </div>
        <div className="digital-log">
          <div className="log-header">DIAGNOSTICS & STATUS LOG</div>
          <div id="log-content" className="log-content">
            <div className="log-entry system">&gt; SYSTEM INITIALIZED</div>
          </div>
        </div>
      </div>

      <div className="panel-area">
        <div className="panel-grid" id="panel-grid">
          {/* Botões inseridos via Vanilla JS */}
        </div>
        <div className="target-legend" id="target-legend" style={{display: 'flex'}}>
          <div className="legend-item"><span className="legend-color legend-purple"></span> Interaction Target</div>
          <div className="legend-item"><span className="legend-color legend-yellow"></span> Visual Verification</div>
        </div>
      </div>

      {/* Tutorial Modal */}
      <div id="tutorial-modal" className="modal-overlay" style={{display: 'none'}}>
        <div className="modal-content" style={{width: '400px', maxWidth: '90vw'}}>
          <div className="modal-header">
            <span className="modal-title">HOW TO USE</span>
            <button className="modal-close" id="tutorial-modal-close">&times;</button>
          </div>
          <div className="modal-body" style={{textAlign: 'left'}}>
            <p><strong>1. Scenarios:</strong> Select a scenario from the top dropdown to practice specific machine operations.</p>
            <p><strong>2. Instructions:</strong> Follow the steps shown in blue text. If you get it wrong, the system will log an error.</p>
            <p><strong>3. Interactions:</strong></p>
            <ul style={{marginLeft: '20px', fontSize: '0.85rem', color: '#ccc', marginBottom: '15px'}}>
              <li><strong>Buttons:</strong> Click or tap to push.</li>
              <li><strong>Switches (2/3 positions):</strong> Click to rotate to the next position.</li>
              <li><strong>Hold Actions:</strong> Click/tap and hold the button until the action completes.</li>
            </ul>
            <p><strong>4. Targets:</strong> Enable "Show Targets" to see which control you should operate (Purple) or check (Yellow).</p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <div id="success-modal" className="modal-overlay" style={{display: 'none'}}>
        <div className="modal-content" style={{borderColor: '#28a745', textAlign: 'center'}}>
          <div className="modal-header" style={{background: '#28a745'}}>
            <span className="modal-title">SCENARIO COMPLETED</span>
            <button className="modal-close" id="success-modal-close">&times;</button>
          </div>
          <div className="modal-body">
            <div style={{fontSize: '4rem', marginBottom: '10px'}}>✅</div>
            <p style={{color: '#fff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px'}}>EXCELLENT WORK!</p>
            <p id="success-message" style={{color: '#ccc', fontSize: '0.9rem', lineHeight: '1.4'}}>You have successfully completed this training scenario.</p>
            <button id="success-modal-ok" className="reset-btn" style={{background: '#28a745', marginTop: '20px', width: '100%', padding: '10px', fontSize: '1rem'}}>CONTINUE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
