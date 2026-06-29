import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import './BiscuitSimulator.css';

export default function BiscuitSimulator() {
  // --- Game State ---
  const [controlLeft, setControlLeft] = useState(true);
  const [controlRight, setControlRight] = useState(false);

  const [pumpLeft, setPumpLeft] = useState(true);
  const [pumpRight, setPumpRight] = useState(false);

  const [productionRunning, setProductionRunning] = useState(false);
  const [hasStartedProduction, setHasStartedProduction] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  const [ladlePos, setLadlePos] = useState('home');
  const [biscuits, setBiscuits] = useState([]);
  const [logs, setLogs] = useState([{ id: 1, text: 'System initialized. Helper side control ACTIVE.', type: 'system' }]);
  const [showHelp, setShowHelp] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState('');
  const [gateSwitchStep, setGateSwitchStep] = useState(1); // 0: left(open), 1: center(0), 2: right(close), 3: center(0)

  const logsEndRef = useRef(null);
  const innerTimerRef = useRef(null);

  const addLog = useCallback((text, type = 'normal') => {
    setLogs(prev => [...prev, { id: Date.now(), text, type }]);
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  useEffect(() => {
    if (biscuits.length >= 12 && !gameOver) {
      setGameOver(true);
      setProductionRunning(false);
      setGameOverReason('Too many biscuits accumulated! The scrap conveyor jammed and caused a major mechanical breakdown.');
    }
  }, [biscuits.length, gameOver]);

  // --- Production Simulation Loop ---
  useEffect(() => {
    let timer;
    if (productionRunning) {
      if (ladlePos === 'home') {
        timer = setTimeout(() => setLadlePos('moving-to-pour'), 1000);
      } else if (ladlePos === 'moving-to-pour') {
        timer = setTimeout(() => setLadlePos('pouring'), 1500);
      } else if (ladlePos === 'pouring') {
        timer = setTimeout(() => {
          setBiscuits(prev => {
            if (prev.length >= 12) return prev;
            return [...prev, {
              id: Date.now(),
              x: Math.random() * 50 + 25,
              y: Math.random() * 40 + 30
            }];
          });
          innerTimerRef.current = setTimeout(() => setLadlePos('returning'), 800);
        }, 1200);
      } else if (ladlePos === 'returning') {
        timer = setTimeout(() => setLadlePos('home'), 1500);
      }
    } else {
      if (ladlePos === 'moving-to-pour') setLadlePos('returning');
      else if (ladlePos === 'pouring') setLadlePos('returning');
      else if (ladlePos === 'returning') {
        timer = setTimeout(() => setLadlePos('home'), 1500);
      }
    }
    return () => {
      clearTimeout(timer);
      if (innerTimerRef.current) clearTimeout(innerTimerRef.current);
    };
  }, [productionRunning, ladlePos]);


  // --- Interactions Left Panel ---
  const handleToggleControlLeft = () => {
    if (controlLeft) {
      if (productionRunning) {
        setGameOver(true);
        setGameOverReason('You turned off the control power while production was running!\\n\\nThe ladle was full of metal, and without power/pumps, the metal froze inside the ladle, destroying the equipment.');
        setProductionRunning(false);
        addLog('FATAL ERROR: Control Power turned off during production! Metal froze in ladle.', 'error');
        return;
      }
      setControlLeft(false);
      setPumpLeft(false);
      addLog('Left Control Power OFF.', 'system');
    } else {
      if (controlRight) {
        addLog('Cannot enable Left Control while Right Control is ON. Safety interlock.', 'error');
        return;
      }
      setControlLeft(true);
      addLog('Left Control Power ON.', 'system');
    }
  };

  const handleStartPumpLeft = () => {
    if (!controlLeft) {
      addLog('Cannot start pump: Left Control Power is OFF.', 'error');
      return;
    }
    if (pumpLeft) {
      addLog('Left Pump is already ON.', 'warning');
      return;
    }
    setPumpLeft(true);
    addLog('Left Pump ON.', 'system');
  };

  const handleStopPumpLeft = () => {
    if (!pumpLeft) return;
    if (productionRunning) {
      setGameOver(true);
      setGameOverReason('You turned off the pump while production was running!\\n\\nThe ladle was full of metal, and without power/pumps, the metal froze inside the ladle, destroying the equipment.');
      setProductionRunning(false);
      addLog('FATAL ERROR: Pump turned off during production! Metal froze in ladle.', 'error');
      return;
    }
    setPumpLeft(false);
    addLog('Left Pump OFF.', 'system');
  };

  const handleStartProduction = () => {
    if (!controlLeft) {
      addLog('Cannot start production: Control Power is OFF.', 'error');
      return;
    }
    if (!pumpLeft) {
      addLog('Cannot start production: Pump is OFF.', 'error');
      return;
    }
    if (gateOpen) {
      addLog('Cannot start production: Safety Gate is OPEN.', 'error');
      return;
    }
    if (productionRunning) {
      addLog('Production is already running.', 'warning');
      return;
    }
    setProductionRunning(true);
    setHasStartedProduction(true);
    addLog('Production Cycle STARTED.', 'success');
  };

  const handleStopProduction = () => {
    if (!productionRunning) return;
    setProductionRunning(false);
    addLog('Production Cycle STOPPED. Waiting for Ladle to return home.', 'system');
  };

  // --- Interactions Right Panel ---
  const handleToggleControlRight = () => {
    if (controlRight) {
      setControlRight(false);
      setPumpRight(false);
      addLog('Right Control Power OFF.', 'system');
    } else {
      if (controlLeft) {
        addLog('Cannot enable Right Control while Left Control is ON. Safety interlock.', 'error');
        return;
      }
      setControlRight(true);
      addLog('Right Control Power ON.', 'system');
    }
  };

  const handleStartPumpRight = () => {
    if (!controlRight) {
      addLog('Cannot start pump: Right Control Power is OFF.', 'error');
      return;
    }
    if (pumpRight) {
      addLog('Right Pump is already ON.', 'warning');
      return;
    }
    setPumpRight(true);
    addLog('Right Pump ON.', 'system');
  };

  const handleStopPumpRight = () => {
    if (!pumpRight) return;
    setPumpRight(false);
    addLog('Right Pump OFF.', 'system');
  };

  const handleToggleGateSwitch = () => {
    // Determine intention based on current gate state
    const pos = gateOpen ? 'right' : 'left';

    if (pos === 'left') {
      if (!controlRight || !pumpRight || ladlePos !== 'home' || productionRunning) {
        addLog('Gate open command FAILED (Check power/pump/ladle).', 'error');
        setGateSwitchStep(0);
      } else {
        setGateOpen(true);
        addLog('Safety Gate OPENED. You can now clean the biscuits.', 'success');
        setGateSwitchStep(0);
      }
    } else if (pos === 'right') {
      if (!controlRight || !pumpRight) {
        addLog('Gate close command FAILED (Check power/pump).', 'error');
        setGateSwitchStep(2);
      } else {
        setGateOpen(false);
        addLog('Safety Gate CLOSED.', 'system');
        setGateSwitchStep(2);
      }
    }

    // Auto-return to 0 (center) after 500ms
    setTimeout(() => {
      setGateSwitchStep(1);
    }, 500);
  };

  const handleBiscuitClick = (id) => {
    if (!gateOpen) {
      addLog('Cannot reach biscuit: Safety Gate is closed.', 'error');
      return;
    }
    setBiscuits(prev => prev.filter(b => b.id !== id));
    addLog('Biscuit jam cleared.', 'success');
  };


  return (
    <div className="biscuit-sim-wrapper font-['Inter'] text-white">
      <div className="biscuit-header">
        <div className="header-left flex items-center gap-4">
          <Link to="/" className="home-link flex items-center gap-2 text-[var(--neon-blue)] hover:text-white transition-colors text-sm font-bold uppercase tracking-wider no-underline">
            <span>←</span> Home
          </Link>
          <div className="vertical-divider w-[1px] h-[15px] bg-white/20"></div>
          <span className="training-title font-['Share_Tech_Mono'] text-lg md:text-xl bg-gradient-to-br from-[#ff3232] to-[#b400ff] bg-clip-text text-transparent tracking-widest uppercase m-0 font-bold">
            BISCUIT JAM SIMULATOR
          </span>
        </div>
        <div className="biscuit-status-bar flex items-center gap-4 bg-black/40 px-4 py-2 rounded border border-white/10 font-mono text-sm">
          <div>Biscuits Accumulated: <span style={{ color: biscuits.length > 8 ? '#ff3232' : '#00ff41', fontWeight: 'bold' }}>{biscuits.length}</span></div>
          <button className="tutorial-btn" onClick={() => setShowHelp(true)}>❓ Help</button>
        </div>
      </div>

      <div className="biscuit-main-area">

        {/* LEFT HMI - Helper Side */}
        <div className="biscuit-panel left-panel">
          <div className="panel-title">HELPER SIDE</div>

          <div className="control-group">
            <div className="control-label">CONTROL PWR</div>
            <div className={`switch-selector ${controlLeft ? 'pos-right' : 'pos-left'}`} onClick={handleToggleControlLeft}></div>
            <div className="control-options" style={{ marginTop: '8px', width: '60px', marginLeft: 'auto', marginRight: 'auto' }}><span>OFF</span><span>ON</span></div>
          </div>

          <div className="control-group">
            <div className="control-label">PUMP MOTOR</div>
            <div className="btn-row flex gap-4">
              <button className={`btn-push btn-illuminated color-white ${pumpLeft ? 'active' : ''}`} onClick={handleStartPumpLeft}></button>
              <button className="btn-push color-black" onClick={handleStopPumpLeft}></button>
            </div>
            <div className="control-options" style={{ gap: '15px', marginTop: '8px' }}><span>START</span><span>STOP</span></div>
          </div>

          <div className="control-group">
            <div className="control-label">PRODUCTION</div>
            <div className="btn-row flex gap-4">
              <div className="relative">
                {!hasStartedProduction && !productionRunning && !gameOver && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[#237727] animate-bounce whitespace-nowrap font-bold text-sm pointer-events-none drop-shadow-[0_0_8px_rgba(0,255,65,0.8)] z-10">
                    ↑ START
                  </div>
                )}
                <button className={`btn-push color-green ${productionRunning ? 'active' : ''}`} onClick={handleStartProduction}></button>
              </div>
              <button className="btn-push color-red" onClick={handleStopProduction}></button>
            </div>
            <div className="control-options" style={{ gap: '15px', marginTop: '8px' }}><span>START</span><span>STOP</span></div>
          </div>
        </div>

        {/* CENTER VIEW - DCM Schematic */}
        <div className="dcm-schematic-area relative bg-[#1a1a1a] rounded-lg border-2 border-[#333] overflow-hidden flex-1 shadow-inner shadow-black/50 min-w-[300px]">
          <div className="dcm-base w-full h-full relative">
            <div className="absolute top-2 left-2 text-[#555] font-mono text-xs tracking-widest font-bold">DCM SCHEMATIC VIEW</div>

            {!productionRunning && !gameOver && (
              <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900/90 border-2 border-red-500 text-white p-4 rounded-lg text-center z-[100] w-[85%] max-w-[400px] shadow-[0_0_30px_rgba(255,0,0,0.6)] backdrop-blur-sm animate-pulse flex flex-col items-center">
                <span className="text-4xl mb-2">⚠️</span>
                <h3 className="font-bold text-xl mb-2 text-red-300 font-['Share_Tech_Mono'] tracking-wide">MACHINE IDLE</h3>
                <p className="text-sm text-gray-200 mb-2 leading-relaxed">The machine is NOT producing parts. You are losing money every second!</p>
                <p className="text-sm font-bold text-[#ffcc00] mt-3 bg-black/40 px-3 py-1 rounded border border-[#ffcc00]/30">Resolve the issue and START production quickly!</p>
              </div>
            )}

            {biscuits.length > 5 && !gameOver && (
              <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 bg-red-600 text-white font-bold text-sm p-3 rounded-lg border-2 border-red-400 animate-pulse z-[110] shadow-[0_0_20px_rgba(255,0,0,0.8)] w-[90%] text-center">
                ⚠️ DANGER: {biscuits.length} biscuits accumulated! Stop the Production Cycle and clean the scrap conveyor via the Operator Side immediately, or the DCM will be damaged!
              </div>
            )}

            <div className="dcm-furnace">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[0.6rem] font-bold text-[#bbb] whitespace-nowrap">FURNACE</div>
              <div className="molten-bath"></div>
              <div className="ingot-pile">
                <div className="ingot ingot-base-1"></div>
                <div className="ingot ingot-base-2"></div>
                <div className="ingot ingot-base-3"></div>
                <div className="ingot ingot-mid-1"></div>
                <div className="ingot ingot-mid-2"></div>
                <div className="ingot ingot-top"></div>
              </div>
            </div>

            <div className="dcm-die-area">
              <div className="die-fixed">3rd Plate</div>
              <div className="die-moving">Moving Platen</div>
            </div>

            <div className="dcm-pour-station">
              <div className="pour-station-label">SHOT SLEEVE</div>
            </div>

            <div className={`dcm-ladle pos-${ladlePos}`}>
              <div className="ladle-arm"></div>
              <div className="ladle-cup"></div>
            </div>

            <div className={`dcm-gate ${gateOpen ? 'open' : 'closed'}`}>
              <div className="gate-door"></div>
              <div className="gate-label absolute rotate-90 right-2 top-10 font-bold text-xs text-white/50">OPERATOR GATE</div>
            </div>

            <div className="dcm-scrap-conveyor">
              <div className="conveyor-label">SCRAP CONVEYOR</div>
              {biscuits.map(b => (
                <div
                  key={b.id}
                  className="biscuit-item"
                  style={{ left: `${b.x}%`, top: `${b.y}%` }}
                  onClick={() => handleBiscuitClick(b.id)}
                  title="Click to clean"
                >
                  <div className="biscuit-core"></div>
                  <div className="biscuit-legs">
                    <div className="leg-pair inner"></div>
                    <div className="leg-pair middle"></div>
                    <div className="leg-pair outer"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-1 right-2 text-[#555] text-[0.55rem] text-right pointer-events-none max-w-[250px] leading-tight italic">
              * Simplified view of the DCM and HMI to facilitate the understanding of the process.
            </div>

          </div>
        </div>

        {/* RIGHT HMI - Operator Side */}
        <div className="biscuit-panel right-panel">
          <div className="panel-title">OPERATOR SIDE</div>

          <div className="control-group">
            <div className="control-label">CONTROL PWR</div>
            <div className={`switch-selector ${controlRight ? 'pos-right' : 'pos-left'}`} onClick={handleToggleControlRight}></div>
            <div className="control-options" style={{ marginTop: '8px', width: '60px', marginLeft: 'auto', marginRight: 'auto' }}><span>OFF</span><span>ON</span></div>
          </div>

          <div className="control-group">
            <div className="control-label">PUMP MOTOR</div>
            <div className="btn-row flex gap-4">
              <button className={`btn-push btn-illuminated color-white ${pumpRight ? 'active' : ''}`} onClick={handleStartPumpRight}></button>
              <button className="btn-push color-black" onClick={handleStopPumpRight}></button>
            </div>
            <div className="control-options" style={{ gap: '15px', marginTop: '8px' }}><span>START</span><span>STOP</span></div>
          </div>

          <div className="control-group">
            <div className="control-label">SAFETY GATE</div>
            <div className={`switch-selector pos-${gateSwitchStep === 0 ? 'left' : gateSwitchStep === 2 ? 'right' : 'center'}`} onClick={handleToggleGateSwitch}></div>
            <div className="control-options" style={{ fontSize: '0.4rem', marginTop: '8px', width: '70px', marginLeft: 'auto', marginRight: 'auto' }}><span>OPEN</span><span>0</span><span>CLOSE</span></div>
          </div>
        </div>

      </div>

      {/* LOG TERMINAL */}
      <div className="biscuit-log-area bg-black rounded-lg border-2 border-[#222] p-2 h-[150px] flex flex-col font-mono text-sm mt-4">
        <div className="log-header text-[#666] text-xs border-b border-[#333] pb-1 mb-2">OPERATION LOG</div>
        <div className="log-content flex-1 overflow-y-auto flex flex-col gap-1 pr-2">
          {logs.map(log => (
            <div key={log.id} className={`log-entry ${log.type === 'error' ? 'text-red-500' : log.type === 'warning' ? 'text-yellow-500' : log.type === 'success' ? 'text-green-500' : log.type === 'system' ? 'text-gray-500' : 'text-blue-300'}`}>
              &gt; {log.text}
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </div>

      {/* HELP MODAL */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal-content tutorial-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">HOW TO CLEAN BISCUITS</span>
              <button className="modal-close" onClick={() => setShowHelp(false)}>&times;</button>
            </div>
            <div className="modal-body modal-body-left">
              <p><strong>1. Stop Production:</strong> On the HELPER SIDE (Left), press the STOP button and wait for the ladle to return to the Home position.</p>
              <p><strong>2. Transfer Control:</strong> Turn OFF the PUMP MOTOR and CONTROL PWR on the Helper Side. Then, turn ON CONTROL PWR on the OPERATOR SIDE (Right).</p>
              <p><strong>3. Open Gate:</strong> Turn ON the PUMP MOTOR on the Operator Side, then switch the SAFETY GATE to OPEN.</p>
              <p><strong>4. Clean:</strong> Click on the biscuits inside the Scrap Conveyor to clean them.</p>
              <p><strong>5. Resume:</strong> Close the Safety Gate, transfer control back to the Helper Side, turn on the Pump, and START production.</p>
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER MODAL */}
      {gameOver && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ borderColor: '#dc3545', textAlign: 'center' }}>
            <div className="modal-header" style={{ background: '#dc3545' }}>
              <span className="modal-title">GAME OVER</span>
            </div>
            <div className="modal-body">
              <div style={{ fontSize: '4rem', marginBottom: '10px' }}>💥</div>
              <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px' }}>FATAL ERROR</p>
              <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                {gameOverReason}
              </p>
              <button
                onClick={() => window.location.reload()}
                style={{ background: '#dc3545', marginTop: '20px', width: '100%', padding: '10px', fontSize: '1rem', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                RESTART SIMULATOR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
