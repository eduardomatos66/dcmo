# Panel Simulator Module

The **Panel Simulator** is the core interactive module of the DCMO portal. It provides a risk-free, highly realistic digital twin of the Die Casting Machine's physical control panel.

## Overview
Operators use this module to practice complex operational sequences, respond to machine states, and memorize the location of buttons and switches without the risk of damaging real equipment.

## Key Features
- **High-Fidelity Replicas**: The module accurately simulates various physical controls:
  - Momentary push buttons (standard, illuminated, and mushroom-head).
  - 2-position and 3-position guarded toggles/selectors.
  - Pilot lights and status indicators.
  - Infinite-scroll 12-position rotary dials.
- **Dynamic Scenario Engine**: Operators are guided through step-by-step training scenarios (e.g., starting the machine, handling faults).
- **Visual Feedback System**:
  - 🟪 **Purple Highlights**: Point out the exact button or switch the operator needs to interact with to complete the current step.
  - 🟨 **Yellow Highlights**: Point out visual checks (e.g., verifying a pilot light turns on before proceeding).
- **Diagnostics Log**: A digital terminal window records all actions, state changes, and errors to help operators review their performance.

## Technical Details
- **Main Entry**: `src/pages/PanelSimulator.jsx`
- **Core Engine**: The simulation relies on several robust Vanilla JS modules injected into the React environment:
  - `ScenarioEngine.js`: Parses JSON scenarios and manages the state machine.
  - `ControlManager.js`: Handles click/hold events and visual state toggles.
  - `PanelRenderer.js`: Dynamically renders the grid of buttons based on configuration data.
  - `UIController.js`: Manages modals, tutorials, and success states.
- **Data Source**: Scenarios are defined in `src/modules/lockout/data/scenarios.js` (or similar JSON configurations), defining steps, targets, and expected outcomes.
