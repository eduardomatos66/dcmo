# Trim Press Simulator Module

The **Trim Press Simulator** acts as the companion training module to the main DCM Panel Simulator, focusing specifically on the trim press machinery.

## Overview
After the die casting process, parts are typically moved to a trim press. This module ensures operators are equally familiar with the secondary operational controls and safety protocols of the trim press equipment.

## Key Features
- **3D Digital Twin**: A highly detailed visual representation of the trim press.
- **Operational Controls**: Simulates the specific panel and control sequences required to operate the trim press safely.
- **Live Simulation**: Interactive feedback based on user input, mimicking the real-time operation cycle of the press.

## Technical Details
- **Main Entry**: `src/pages/TrimSimulator.jsx`
- **Architecture**: Follows a similar architectural pattern to the main Panel Simulator, leveraging React for the wrapper and UI, while utilizing core JavaScript logic to handle the state machine and simulation feedback.
