# Lockout Layout Module

The **Lockout Layout** module is a critical safety training tool. It provides a comprehensive digital floor plan detailing all energy isolation points on the Die Casting Machine.

## Overview
Lockout/Tagout (LOTO) procedures are essential for maintenance safety. This module trains operators on where specific isolation points are located and what energy source they control.

## Key Features
- **Interactive Floor Plan**: A top-down layout of the machine showing all lockout tags.
- **Categorized Energy Sources**:
  - 🟧 **E-Tags (Orange)**: Electrical isolation points.
  - 🟦 **A-Tags (Blue)**: Air/Pneumatic isolation points.
  - 🟩 **C-Tags (Green)**: Cooling/Water isolation points.
- **Scenario Highlighting**: Operators can select specific maintenance scenarios from the sidebar (e.g., "Die Change" or "Hydraulic Maintenance"). The map will instantly highlight the required lockout tags by pulsing them on the screen.
- **Real-world Reference**: A built-in photo gallery modal provides real pictures of the actual valves, breakers, and switches on the factory floor, bridging the gap between the schematic and reality.

## Technical Details
- **Main Entry**: `src/pages/LockoutLayout.jsx`
- **Styling**: Uses advanced CSS animations (`@keyframes`) for pulsing tags and highlight areas (`LockoutLayout.css`).
- **Data Source**: Lockout scenarios and tag dependencies are managed within the component and `scenarios.js` data files.
