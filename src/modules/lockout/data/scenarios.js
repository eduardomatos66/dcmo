export const scenarios = [
  {
    id: 'trim',
    title: 'Trim',
    desc: 'Disconnect Electric E-9 & Air A-4. On trim tool HMI (25) ensure motor is off. When entering cell lockout at C-2.',
    tags: ['E-9', 'A-4', 'C-2']
  },
  {
    id: 'furnace',
    title: 'Furnace',
    desc: 'Disconnect Electric E-4. When entering the cell lockout at C-3.',
    tags: ['E-4', 'C-3'] // Assuming E-4 based on typical furnace location from previous layout
  },
  {
    id: 'fondarex',
    title: 'Fondarex',
    desc: 'Disconnect Electric E-8 & Air A-3.',
    tags: ['E-8', 'A-3']
  },
  {
    id: 'robots',
    title: 'Robots',
    desc: 'Sprayer: E-6 & A-2. Extract: E-10 & A-5. Extractor lockout at C-2.',
    tags: ['E-6', 'A-2', 'E-10', 'A-5', 'C-2']
  },
  {
    id: 'tcus',
    title: 'TCUs',
    desc: 'Send machine through cooling cycle, shut off power to TCU, and lock out at each TCU.',
    tags: ['TCU AREA'] // Handled generally or specifically if tags are added
  },
  {
    id: 'dcm-hood',
    title: 'DCM Hood',
    desc: 'Open hood, Disconnect Enercon, Electric E-1 & Air A-1.',
    tags: ['E-1', 'A-1']
  },
  {
    id: 'dcm-die-work',
    title: 'DCM (Die Work)',
    desc: 'Open doors & hood, Disconnect Air A-6, turn off pump Electric E-2, lock out at cell C-2.',
    tags: ['A-6', 'E-2', 'C-2']
  },
  {
    id: 'dcm-main-supply',
    title: 'DCM Main Supply',
    desc: 'Disconnect Electric E-3 and lock out on the panel.',
    tags: ['E-3']
  },
  {
    id: 'quench-tank',
    title: 'Quench Tank',
    desc: 'Disconnect Electric E-12.',
    tags: ['E-12']
  },
  {
    id: 'cell',
    title: 'Cell',
    desc: 'Lock out at proper door(s) of respected work area (C-1, C-2, and/or C-3).',
    tags: ['C-1', 'C-2', 'C-3']
  }
];
