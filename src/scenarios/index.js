import startPump from './1_start_pump.json';
import startCycleFromOffWithSpray from './2_start_cycle_from_off_with_spray.json';
import startCycleWithSpray from './2.1_start_cycle_with_sprayer.json';
import startCycleFromOffWithoutSpray from './3_start_cycle_from_off_without_spray.json';
import startCycleWithoutSpray from './3.1_start_cycle_without_sprayer.json';
import stopCycleLadle from './4_stop_cycle_ladle.json';
import disablePanelAndPump from './4.1_disable_panel_and_pump.json';
import ladleHome from './5_ladle_home.json';
import unlockDoor from './6_unlock_door.json';

export const scenariosData = [
  startPump,
  startCycleFromOffWithSpray,
  startCycleWithSpray,
  startCycleFromOffWithoutSpray,
  startCycleWithoutSpray,
  stopCycleLadle,
  disablePanelAndPump,
  ladleHome,
  unlockDoor
];
