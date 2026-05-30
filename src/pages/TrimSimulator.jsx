import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Power, AlertTriangle, ShieldCheck, RefreshCw, Upload, Download, Maximize2 } from 'lucide-react';
import TrimPressScene from '../components/trim/TrimPressScene';
import useMachineCycle from '../components/trim/hooks/useMachineCycle';
import { STATES } from '../components/trim/data/cycleStates';

export default function TrimSimulator() {
  const machineController = useMachineCycle();
  const { 
    machineState, faultMessage, sensors, 
    startCycle, toggleDoor, toggleLightCurtain, eStop, reset, loadPart, unloadPart 
  } = machineController;

  const StatusLED = ({ active, label, fault = false }) => (
    <div className="flex items-center justify-between p-2 bg-gray-800/40 rounded border border-gray-700/50">
      <span className="text-[10px] text-gray-300 font-mono uppercase truncate mr-2" title={label}>{label}</span>
      <div className={`w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ${
        active 
          ? (fault ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]') 
          : 'bg-gray-700 border border-gray-600'
      }`}></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between shadow-md z-10 relative">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-gray-800 rounded-full transition-colors group">
            <ArrowLeft className="text-gray-400 group-hover:text-white transition-colors" size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Trim Press Simulator Pro
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">FULL INDUSTRIAL DIGITAL TWIN</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700/50 ${machineState === STATES.ESTOP || machineState === STATES.FAULT ? 'animate-pulse' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${
              machineState === STATES.ESTOP || machineState === STATES.FAULT 
                ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
            }`}></div>
            <span className="text-sm font-medium text-gray-300 font-mono">{machineState}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col xl:flex-row gap-6 min-h-[calc(100vh-73px)]">
        
        {/* 3D Simulation Area */}
        <div className="flex-1 flex flex-col relative min-h-[50vh] xl:min-h-0">
          <div className="absolute top-4 left-4 z-10 space-y-2 pointer-events-none">
            {faultMessage && (
              <div className="bg-red-900/80 backdrop-blur-md text-red-200 px-4 py-3 rounded-lg border border-red-500 shadow-lg flex items-center gap-3 max-w-md pointer-events-auto">
                <AlertTriangle size={24} className="text-red-400 shrink-0" />
                <div className="font-bold text-sm leading-tight">{faultMessage}</div>
              </div>
            )}
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button 
              onClick={toggleDoor}
              className={`px-3 py-1.5 text-xs font-bold rounded shadow-lg border transition-colors ${
                sensors.DOOR_LEFT_OPEN || sensors.DOOR_RIGHT_OPEN 
                  ? 'bg-red-900/80 border-red-500 text-red-200' 
                  : 'bg-gray-800/80 border-gray-600 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Toggle Doors
            </button>
            <button 
              onClick={toggleLightCurtain}
              className={`px-3 py-1.5 text-xs font-bold rounded shadow-lg border transition-colors ${
                sensors.LIGHT_CURTAIN_BLOCKED
                  ? 'bg-red-900/80 border-red-500 text-red-200' 
                  : 'bg-gray-800/80 border-gray-600 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Block Light Curtain
            </button>
          </div>

          <TrimPressScene machineController={machineController} />
        </div>

        {/* Control Panel Area */}
        <div className="w-full xl:w-[420px] shrink-0 flex flex-col gap-6">
          
          {/* Main Controls */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 shadow-xl relative overflow-hidden shrink-0">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
            
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-gray-400 uppercase tracking-wider">
              <Settings className="text-blue-400" size={16} />
              Operation Panel
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                onClick={startCycle}
                disabled={machineState !== STATES.READY_TO_START}
                className="col-span-2 py-3 bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:opacity-50 disabled:grayscale text-white rounded-lg font-bold text-base shadow-[0_0_15px_rgba(34,197,94,0.3)] border border-green-400/50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Power size={20} />
                START CYCLE
              </button>
              
              <button 
                onClick={loadPart}
                disabled={machineState !== STATES.IDLE}
                className="py-2.5 bg-blue-900/40 hover:bg-blue-900/60 disabled:opacity-50 disabled:grayscale text-blue-300 rounded-lg font-semibold text-sm border border-blue-900/50 transition-colors active:scale-95 flex items-center justify-center gap-2"
              >
                <Upload size={16} />
                LOAD PART
              </button>
              
              <button 
                onClick={unloadPart}
                disabled={machineState !== STATES.UNLOADING}
                className="py-2.5 bg-cyan-900/40 hover:bg-cyan-900/60 disabled:opacity-50 disabled:grayscale text-cyan-300 rounded-lg font-semibold text-sm border border-cyan-900/50 transition-colors active:scale-95 flex items-center justify-center gap-2"
              >
                <Download size={16} />
                UNLOAD PART
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={reset}
                className="py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg font-semibold text-sm border border-gray-700 transition-colors active:scale-95 flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                RESET FAULT
              </button>
              <button 
                onClick={eStop}
                className="py-2.5 bg-red-900/80 hover:bg-red-600 text-white rounded-lg font-bold text-sm border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <AlertTriangle size={18} />
                E-STOP
              </button>
            </div>
          </div>

          {/* Diagnostics / Sensors */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 shadow-xl flex-1">
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-gray-400 uppercase tracking-wider">
              <Maximize2 className="text-cyan-400" size={16} />
              PLC Diagnostics
            </h2>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 text-xs font-bold text-gray-500 mb-1 border-b border-gray-800 pb-1">CORES</div>
              <StatusLED active={sensors.LS_CORE_LEFT_OPEN} label="LS_CORE_LEFT_OPEN" />
              <StatusLED active={sensors.LS_CORE_LEFT_CLOSED} label="LS_CORE_LEFT_CLOSED" />
              <StatusLED active={sensors.LS_CORE_RIGHT_OPEN} label="LS_CORE_RIGHT_OPEN" />
              <StatusLED active={sensors.LS_CORE_RIGHT_CLOSED} label="LS_CORE_RIGHT_CLOSED" />
              
              <div className="col-span-2 text-xs font-bold text-gray-500 mb-1 mt-2 border-b border-gray-800 pb-1">RAM</div>
              <StatusLED active={sensors.LS_RAM_TOP} label="LS_RAM_TOP" />
              <StatusLED active={sensors.LS_RAM_BOTTOM} label="LS_RAM_BOTTOM" />
              
              <div className="col-span-2 text-xs font-bold text-gray-500 mb-1 mt-2 border-b border-gray-800 pb-1">EJECTORS</div>
              <StatusLED active={sensors.LS_EJECTOR_HOME} label="LS_EJECTOR_HOME" />
              <StatusLED active={sensors.LS_EJECTOR_EXTENDED} label="LS_EJECTOR_EXTENDED" />
              
              <div className="col-span-2 text-xs font-bold text-gray-500 mb-1 mt-2 border-b border-gray-800 pb-1">SAFETY & PROCESS</div>
              <StatusLED active={!sensors.DOOR_LEFT_OPEN} label="DOOR_LEFT_CLOSED" />
              <StatusLED active={!sensors.DOOR_RIGHT_OPEN} label="DOOR_RIGHT_CLOSED" />
              <StatusLED active={!sensors.LIGHT_CURTAIN_BLOCKED} label="LGT_CURTAIN_CLEAR" />
              <StatusLED active={sensors.PART_PRESENT} label="PART_PRESENT" />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
