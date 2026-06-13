# DCM Parts Module

The **DCM Parts** module is an interactive learning tool designed to help operators familiarize themselves with the physical components and systems of a Die Casting Machine (DCM).

## Overview
Understanding the anatomy of the machine is the first step to operating it safely and efficiently. This module provides a high-level view of the machine and allows users to explore specific parts in detail.

## Key Features
- **Interactive Visual Map**: A detailed layout of the machine. Users can hover over and click on various highlighted areas to see what component is located there.
- **Component Details**: Selecting a component reveals a detailed panel with:
  - Component name and function description.
  - A carousel of reference photos showing the part in a real-world setting.
- **Dropdown Navigation**: Users can quickly jump to a specific part using a searchable dropdown menu.
- **Dynamic Highlights**: The map utilizes CSS animations to pulse and draw attention to the currently selected component.

## Technical Details
- **Main Entry**: `src/pages/MachineParts.jsx`
- **Sub-components**: 
  - `InteractiveMap.jsx`: Handles the rendering of the layout image and dynamic tagging system (pinpoints and bounding boxes).
  - `PartDetails.jsx`: Manages the display of component descriptions and the image carousel.
  - `PartSelectorDropdown.jsx`: Provides the accessible dropdown interface.
- **Data Source**: Component information, including coordinates and image paths, is driven by `src/data/machinePartsData.js`.
