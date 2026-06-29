import { MarkerType } from '@xyflow/react';

export const componentsData = {
  DCM: {
    id: 'DCM',
    name: 'DCM',
    icon: '⚙️',
    cycles: [
      { id: 'dcm-1', title: 'Home', description: 'Machine is in the home position, ready to start a new cycle.' },
      { id: 'dcm-2', title: 'Die', description: 'The die halves close.' },
      { id: 'dcm-3', title: 'Cores', description: 'Cores are inserted into the die cavity.' },
      { id: 'dcm-4', title: 'Plunger', description: 'Plunger injects metal into the die.' },
      { id: 'dcm-5', title: 'Ejectors', description: 'Ejector pins push the solidified part out of the die.' }
    ]
  },
  Ladle: {
    id: 'Ladle',
    name: 'Ladle',
    icon: '🔥',
    cycles: [
      { id: 'ladle-1', title: 'Home', description: 'Ladle is at its resting position.' },
      { id: 'ladle-2', title: 'Metal', description: 'Ladle scoops molten metal from the furnace.' },
      { id: 'ladle-3', title: 'Furnace Lid', description: 'Furnace lid operations during ladling.' },
      { id: 'ladle-4', title: 'Pours', description: 'Ladle pours molten metal into the DCM shot sleeve. (Waits for DCM die close)' }
    ]
  },
  Sprayer: {
    id: 'Sprayer',
    name: 'Sprayer',
    icon: '💧',
    cycles: [
      { id: 'sprayer-1', title: 'Home', description: 'Sprayer is outside the die area.' },
      { id: 'sprayer-2', title: 'Move In', description: 'Sprayer moves between the open die halves.' },
      { id: 'sprayer-3', title: 'Spray Die', description: 'Applies lubricant to the die faces.' },
      { id: 'sprayer-4', title: 'Blow Air', description: 'Blows compressed air to distribute lube and dry the die.' },
      { id: 'sprayer-5', title: 'Move Out', description: 'Sprayer returns to home position.' }
    ]
  },
  Robot: {
    id: 'Robot',
    name: 'Robot Extractor',
    icon: '🤖',
    cycles: [
      { id: 'robot-1', title: 'Home', description: 'Robot is idle.' },
      { id: 'robot-2', title: 'Get Part', description: 'Robot enters DCM and grips the part. (Waits for Ejectors)' },
      { id: 'robot-3', title: 'Photocells', description: 'Checks part integrity via photocell sensors.' },
      { id: 'robot-4', title: 'Overflows', description: 'Breaks off excess material (overflows).' },
      { id: 'robot-5', title: 'To Cooler', description: 'Places the hot part into the cooling station.' },
      { id: 'robot-6', title: 'Cooler Spin', description: 'Cooler spins/operates to cool the part.' },
      { id: 'robot-7', title: 'Check TP', description: 'Robot checks if there is already a part in the Trimpress. Flow diverges here.' },
      { id: 'robot-8', title: 'Get TP Part', description: 'Retrieves the finished trimmed part from the Trimpress.' },
      { id: 'robot-9', title: 'Conveyor', description: 'Drops the finished part onto the exit conveyor.' },
      { id: 'robot-10', title: 'From Cooler', description: 'Retrieves the cooled part from the cooling station.' },
      { id: 'robot-11', title: 'Put on TP', description: 'Places the cooled part into the Trimpress.' },
      { id: 'robot-12', title: 'Wait TP', description: 'Waits for Trimpress to finish its cycle before retrieving.' }
    ]
  },
  Trimpress: {
    id: 'Trimpress',
    name: 'Trimpress',
    icon: '✂️',
    cycles: [
      { id: 'tp-1', title: 'Home', description: 'Trimpress is open and waiting.' },
      { id: 'tp-2', title: 'Check Part', description: 'Verifies part is correctly placed.' },
      { id: 'tp-3', title: 'Down', description: 'Press moves down to trim the part.' },
      { id: 'tp-4', title: 'Cores In', description: 'Side cores engage if necessary.' },
      { id: 'tp-5', title: 'Cores Out', description: 'Side cores retract.' },
      { id: 'tp-6', title: 'Up', description: 'Press moves back up. (Starts after Robot puts part on TP)' }
    ]
  }
};

export const getIntegratedNodesAndEdges = () => {
  const nodes = [];
  const edges = [];

  const centers = {
    DCM: { cx: 500, cy: 500, radius: 150, color: '#1e3a8a', border: '#3b82f6' },
    Ladle: { cx: 500, cy: 150, radius: 100, color: '#7f1d1d', border: '#ef4444' },
    Sprayer: { cx: 850, cy: 500, radius: 120, color: '#164e63', border: '#06b6d4' },
    Robot: { cx: 500, cy: 880, radius: 180, color: '#14532d', border: '#22c55e' },
    Trimpress: { cx: 150, cy: 500, radius: 120, color: '#581c87', border: '#a855f7' }
  };

  Object.values(componentsData).forEach((comp) => {
    const { cx, cy, radius, color, border } = centers[comp.id];
    
    comp.cycles.forEach((cycle, index) => {
      const angle = (index / comp.cycles.length) * 2 * Math.PI - Math.PI / 2;
      const nextAngle = (((index + 1) % comp.cycles.length) / comp.cycles.length) * 2 * Math.PI - Math.PI / 2;
      const prevAngle = (((index - 1 + comp.cycles.length) % comp.cycles.length) / comp.cycles.length) * 2 * Math.PI - Math.PI / 2;

      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      const nx = cx + radius * Math.cos(nextAngle);
      const ny = cy + radius * Math.sin(nextAngle);
      const px = cx + radius * Math.cos(prevAngle);
      const py = cy + radius * Math.sin(prevAngle);

      const sourceAngle = Math.atan2(ny - y, nx - x);
      const targetAngle = Math.atan2(py - y, px - x);

      nodes.push({
        id: cycle.id,
        type: 'dot',
        position: { x: x - 30, y: y - 30 },
        data: {
          label: cycle.title,
          description: cycle.description,
          sourceAngle,
          targetAngle,
          style: {
            background: color,
            color: '#fff',
            border: `2px solid ${border}`,
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: '10px',
            padding: '2px',
            position: 'relative'
          }
        }
      });

      // Internal edges
      edges.push({
        id: `e-${comp.id}-${index}`,
        source: cycle.id,
        target: comp.cycles[(index + 1) % comp.cycles.length].id,
        type: 'straight',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color: border },
        style: { stroke: border, strokeWidth: 2 }
      });
    });
  });

  // Cross component edges
  const crossEdges = [
    { id: 'c-1', source: 'dcm-2', target: 'ladle-4', label: 'Wait Die', style: { stroke: '#9ca3af', strokeDasharray: '4,4' } },
    { id: 'c-2', source: 'dcm-5', target: 'robot-2', label: 'Get Part', style: { stroke: '#22c55e', strokeDasharray: '4,4' } },
    { id: 'c-3', source: 'dcm-5', target: 'sprayer-2', label: 'Start Lube', style: { stroke: '#06b6d4', strokeDasharray: '4,4' } },
    { id: 'c-4', source: 'ladle-4', target: 'dcm-4', label: 'Pour Done', style: { stroke: '#ef4444', strokeDasharray: '4,4' } },
    { id: 'c-5', source: 'robot-11', target: 'tp-3', label: 'Part Placed', style: { stroke: '#a855f7', strokeDasharray: '4,4' } }
  ];

  crossEdges.forEach(ce => {
    edges.push({
      ...ce,
      type: 'straight',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: ce.style.stroke },
      labelStyle: { fill: '#fff', fontWeight: 'bold', fontSize: 11, background: '#000', padding: 2 }
    });
  });

  return { nodes, edges };
};
