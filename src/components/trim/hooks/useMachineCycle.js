import { useState, useCallback, useEffect } from 'react';
import { STATES } from '../data/cycleStates';

export default function useMachineCycle() {
  const [machineState, setMachineState] = useState(STATES.IDLE);
  const [faultMessage, setFaultMessage] = useState(null);

  // Mechanical targets (0 to 1 scale)
  const [targets, setTargets] = useState({
    ram: 0,        // 0 = UP, 1 = DOWN
    leftCore: 0,   // 0 = OPEN, 1 = CLOSED
    rightCore: 0,  // 0 = OPEN, 1 = CLOSED
    ejector: 0,    // 0 = HOME, 1 = EXTENDED
  });

  const [sensors, setSensors] = useState({
    LS_CORE_LEFT_OPEN: true,
    LS_CORE_LEFT_CLOSED: false,
    LS_CORE_RIGHT_OPEN: true,
    LS_CORE_RIGHT_CLOSED: false,
    LS_RAM_TOP: true,
    LS_RAM_BOTTOM: false,
    LS_EJECTOR_HOME: true,
    LS_EJECTOR_EXTENDED: false,
    DOOR_LEFT_OPEN: false,
    DOOR_RIGHT_OPEN: false,
    LIGHT_CURTAIN_BLOCKED: false,
    PART_PRESENT: false, // Piece positioned
  });

  // Handle sensor updates from the physical animation side safely
  const updateSensors = useCallback((updates) => {
    setSensors((prev) => {
      let changed = false;
      for (let key in updates) {
        if (prev[key] !== updates[key]) changed = true;
      }
      return changed ? { ...prev, ...updates } : prev;
    });
  }, []);

  const loadPart = () => {
    if (machineState === STATES.IDLE) {
      setMachineState(STATES.LOADING);
      setTimeout(() => {
        updateSensors({ PART_PRESENT: true });
        setMachineState(STATES.READY_TO_START);
      }, 1000);
    }
  };

  const startCycle = useCallback(() => {
    if (machineState !== STATES.READY_TO_START) return;
    
    if (sensors.DOOR_LEFT_OPEN || sensors.DOOR_RIGHT_OPEN) {
      setFaultMessage("Cannot start: Safety doors open");
      setMachineState(STATES.FAULT);
      return;
    }
    if (sensors.LIGHT_CURTAIN_BLOCKED) {
      setFaultMessage("Cannot start: Light curtain blocked");
      setMachineState(STATES.FAULT);
      return;
    }
    if (!sensors.PART_PRESENT) {
      setFaultMessage("Cannot start: No part present");
      setMachineState(STATES.FAULT);
      return;
    }
    // Check if machine is in home position
    if (!sensors.LS_RAM_TOP || !sensors.LS_CORE_LEFT_OPEN || !sensors.LS_CORE_RIGHT_OPEN || !sensors.LS_EJECTOR_HOME) {
      setFaultMessage("Cannot start: Machine not in home position");
      setMachineState(STATES.FAULT);
      return;
    }
    
    setMachineState(STATES.PRESSING);
  }, [machineState, sensors]);

  const toggleDoor = () => {
    setSensors(prev => ({ ...prev, DOOR_LEFT_OPEN: !prev.DOOR_LEFT_OPEN, DOOR_RIGHT_OPEN: !prev.DOOR_RIGHT_OPEN }));
  };

  const toggleLightCurtain = () => {
    setSensors(prev => ({ ...prev, LIGHT_CURTAIN_BLOCKED: !prev.LIGHT_CURTAIN_BLOCKED }));
  };

  const eStop = () => {
    setFaultMessage("EMERGENCY STOP ACTIVATED");
    setMachineState(STATES.ESTOP);
  };

  const reset = () => {
    setFaultMessage(null);
    setMachineState(STATES.IDLE);
    setTargets({ ram: 0, leftCore: 0, rightCore: 0, ejector: 0 }); // request return to home
  };

  const unloadPart = () => {
    if (machineState === STATES.UNLOADING) {
      updateSensors({ PART_PRESENT: false });
      setMachineState(STATES.IDLE);
    }
  }

  // Safety interlocks monitoring
  useEffect(() => {
    if (machineState === STATES.ESTOP || machineState === STATES.FAULT) return;
    
    if (sensors.DOOR_LEFT_OPEN || sensors.DOOR_RIGHT_OPEN) {
      setFaultMessage("Safety door opened during operation!");
      setMachineState(STATES.FAULT);
    }
    
    // Light curtain should fault only if not idle/loading/ready/unloading
    if (sensors.LIGHT_CURTAIN_BLOCKED && ![STATES.IDLE, STATES.LOADING, STATES.READY_TO_START, STATES.UNLOADING].includes(machineState)) {
      setFaultMessage("Light curtain blocked during operation!");
      setMachineState(STATES.FAULT);
    }
  }, [sensors, machineState]);

  // Main Cycle Logic State Machine Evaluation
  useEffect(() => {
    if (machineState === STATES.ESTOP || machineState === STATES.FAULT) return;

    switch (machineState) {
      case STATES.PRESSING:
        setTargets(prev => prev.ram === 1 ? prev : { ...prev, ram: 1 });
        if (sensors.LS_RAM_BOTTOM) {
          setMachineState(STATES.CORE_LEFT_CLOSING);
        }
        break;
      case STATES.CORE_LEFT_CLOSING:
        setTargets(prev => prev.leftCore === 1 ? prev : { ...prev, leftCore: 1 });
        if (sensors.LS_CORE_LEFT_CLOSED) {
          setMachineState(STATES.CORE_RIGHT_CLOSING);
        }
        break;
      case STATES.CORE_RIGHT_CLOSING:
        setTargets(prev => prev.rightCore === 1 ? prev : { ...prev, rightCore: 1 });
        if (sensors.LS_CORE_RIGHT_CLOSED) {
          // Delay briefly to simulate pressing operation
          const holdTimer = setTimeout(() => {
            setMachineState(STATES.CORES_OPENING);
          }, 800);
          return () => clearTimeout(holdTimer);
        }
        break;
      case STATES.CORES_OPENING:
        setTargets(prev => (prev.leftCore === 0 && prev.rightCore === 0) ? prev : { ...prev, leftCore: 0, rightCore: 0 });
        if (sensors.LS_CORE_LEFT_OPEN && sensors.LS_CORE_RIGHT_OPEN) {
          setMachineState(STATES.OPENING);
        }
        break;
      case STATES.OPENING:
        setTargets(prev => prev.ram === 0 ? prev : { ...prev, ram: 0 });
        if (sensors.LS_RAM_TOP) {
          setMachineState(STATES.EJECTING);
        }
        break;
      case STATES.EJECTING:
        setTargets(prev => prev.ejector === 1 ? prev : { ...prev, ejector: 1 });
        if (sensors.LS_EJECTOR_EXTENDED) {
          const retractTimer = setTimeout(() => {
            setTargets(prev => prev.ejector === 0 ? prev : { ...prev, ejector: 0 });
            setMachineState(STATES.UNLOADING);
          }, 500);
          return () => clearTimeout(retractTimer);
        }
        break;
      default:
        break;
    }
  }, [machineState, sensors]);

  return {
    machineState,
    faultMessage,
    targets,
    sensors,
    updateSensors,
    startCycle,
    toggleDoor,
    toggleLightCurtain,
    eStop,
    reset,
    loadPart,
    unloadPart
  };
}
