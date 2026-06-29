import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactFlow, Background, Controls, MarkerType, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './DcmCycles.css';
import { componentsData, getIntegratedNodesAndEdges } from '../data/dcmCyclesData';

const DotNode = ({ data }) => {
  return (
    <div style={data.style} title={data.description}>
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ 
          top: 30 + 30 * Math.sin(data.targetAngle), 
          left: 30 + 30 * Math.cos(data.targetAngle), 
          opacity: 0,
          position: 'absolute'
        }} 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ 
          top: 30 + 30 * Math.sin(data.sourceAngle), 
          left: 30 + 30 * Math.cos(data.sourceAngle), 
          opacity: 0,
          position: 'absolute'
        }} 
      />
      {data.label}
    </div>
  );
};

const nodeTypes = { dot: DotNode };

const ComponentTimeline = ({ cycles, activeIndex, onNodeClick }) => {
  const radius = 180;
  const cx = 220;
  const cy = 220;

  const nodes = cycles.map((cycle, index) => {
    const angle = (index / cycles.length) * 2 * Math.PI - Math.PI / 2;
    
    // Center of current node
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    // Center of next node
    const nextAngle = (((index + 1) % cycles.length) / cycles.length) * 2 * Math.PI - Math.PI / 2;
    const nx = cx + radius * Math.cos(nextAngle);
    const ny = cy + radius * Math.sin(nextAngle);

    // Center of previous node
    const prevAngle = (((index - 1 + cycles.length) % cycles.length) / cycles.length) * 2 * Math.PI - Math.PI / 2;
    const px = cx + radius * Math.cos(prevAngle);
    const py = cy + radius * Math.sin(prevAngle);

    // Angles from this center to neighbors
    const sourceAngle = Math.atan2(ny - y, nx - x);
    const targetAngle = Math.atan2(py - y, px - x);

    return {
      id: cycle.id,
      type: 'dot',
      position: { 
        x: x - 30, 
        y: y - 30 
      },
      data: { 
        label: cycle.title,
        description: cycle.description,
        index,
        sourceAngle,
        targetAngle,
        style: {
          background: index === activeIndex ? '#b400ff' : '#1e3a8a',
          color: '#fff',
          border: index === activeIndex ? '2px solid #fff' : '1px solid #3b82f6',
          borderRadius: '50%',
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: index === activeIndex ? '0 0 15px rgba(180,0,255,0.6)' : 'none',
          textAlign: 'center',
          fontWeight: index === activeIndex ? 'bold' : 'normal',
          cursor: 'pointer',
          fontSize: '11px',
          padding: '5px',
          position: 'relative'
        }
      }
    };
  });

  const edges = cycles.map((cycle, index) => {
    if (index === cycles.length - 1) {
      return {
        id: `e-loop-${cycle.id}`,
        source: cycle.id,
        target: cycles[0].id,
        type: 'straight',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#93c5fd' },
        style: { stroke: '#93c5fd', strokeDasharray: '5,5', strokeWidth: 3 }
      };
    }
    return {
      id: `e-${cycle.id}`,
      source: cycle.id,
      target: cycles[index + 1].id,
      type: 'straight',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#3b82f6' },
      style: { stroke: '#3b82f6', strokeWidth: 3 }
    };
  });

  return (
    <ReactFlow 
      nodes={nodes} 
      edges={edges} 
      nodeTypes={nodeTypes}
      fitView 
      fitViewOptions={{ padding: 0.2 }}
      nodesDraggable={false}
      zoomOnScroll={false}
      panOnDrag={true}
      onNodeClick={(_, node) => {
        const idx = cycles.findIndex(c => c.id === node.id);
        if (idx !== -1) onNodeClick(idx);
      }}
    >
      <Background color="#555" gap={16} />
    </ReactFlow>
  );
};

const IntegratedTimeline = () => {
  const { nodes, edges } = getIntegratedNodesAndEdges();

  return (
    <div className="integrated-view w-full flex flex-col gap-6 animate-fade-in h-[700px]">
      <h2 className="text-2xl font-bold text-[#b400ff] border-b border-white/10 pb-4 shrink-0 font-['Share_Tech_Mono']">
        Integrated Parallel Flow Chart
      </h2>
      <p className="text-slate-300 shrink-0">
        Interactive chart illustrating the parallel operation of the cell components and their dependencies. Scroll and zoom to explore!
      </p>

      <div className="flow-container bg-black/60 rounded-xl border border-white/10 relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          className="bg-transparent"
        >
          <Background color="#333" gap={16} />
          <Controls className="bg-white/10 fill-white text-black" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default function DcmCycles() {
  const [activeComponent, setActiveComponent] = useState('DCM');
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);

  const currentCompData = componentsData[activeComponent];

  return (
    <div className="cycles-container bg-[var(--bg-dark)] min-h-screen text-white p-4 md:p-8 flex flex-col">
      <Link to="/" className="back-link mb-6 inline-block text-[var(--neon-blue)] hover:text-white transition-colors w-fit">
        &larr; Back to Home
      </Link>
      
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-['Share_Tech_Mono'] bg-gradient-to-r from-[var(--neon-blue)] to-[#b400ff] bg-clip-text text-transparent mb-4">
          DCM Component Cycle
        </h1>
        <p className="text-slate-400 max-w-3xl mx-auto">
          Explore the operational cycle for each component of the Die Casting Cell or view the integrated parallel sequence.
        </p>
      </header>

      <div className="cycles-content flex-1 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Component Selector Sidebar */}
          <div className="components-sidebar flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 lg:w-64 shrink-0">
            {Object.values(componentsData).map((comp) => (
              <button
                key={comp.id}
                onClick={() => {
                  setActiveComponent(comp.id);
                  setActiveCycleIndex(0); // reset cycle index when changing component
                }}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 min-w-[160px] lg:min-w-0 ${
                  activeComponent === comp.id
                    ? 'bg-white/10 border-[var(--neon-blue)] shadow-[0_0_15px_rgba(0,240,255,0.3)] text-white'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-2xl">{comp.icon}</span>
                <span className="font-semibold font-['Share_Tech_Mono']">{comp.name}</span>
              </button>
            ))}

            {/* All Cycles View Button */}
            <button
              onClick={() => {
                setActiveComponent('Integrated');
                setActiveCycleIndex(0);
              }}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 min-w-[160px] lg:min-w-0 mt-4 ${
                activeComponent === 'Integrated'
                  ? 'bg-white/10 border-[#b400ff] shadow-[0_0_15px_rgba(180,0,255,0.3)] text-white'
                  : 'bg-[#b400ff]/10 border-[#b400ff]/30 text-slate-300 hover:bg-[#b400ff]/20 hover:text-white'
              }`}
            >
              <span className="text-2xl">🌐</span>
              <span className="font-semibold font-['Share_Tech_Mono']">All Cycles</span>
            </button>
          </div>

          {/* Component Cycles Display */}
          <div className="cycles-display flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col min-h-[700px]">
            {activeComponent === 'Integrated' ? (
              <IntegratedTimeline />
            ) : (
              <>


                <div className="flex flex-col xl:flex-row gap-8 flex-1">
                  {/* HUGE State Machine Flowchart on the Left */}
                  <div className="flex-[2] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative min-h-[500px]">
                    <ComponentTimeline 
                      cycles={currentCompData.cycles} 
                      activeIndex={activeCycleIndex} 
                      onNodeClick={setActiveCycleIndex} 
                    />
                  </div>

                  {/* Right Panel: Active Details + Cycles List */}
                  <div className="flex-1 flex flex-col gap-6">
                    {/* Active State Text Details */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col justify-center items-center text-center shrink-0 min-h-[200px]">
                      <div key={currentCompData.cycles[activeCycleIndex].id} className="animate-fade-in w-full">
                        <div className="text-[var(--neon-blue)] font-bold text-4xl mb-4 opacity-50 font-['Share_Tech_Mono']">
                          0{activeCycleIndex + 1}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {currentCompData.cycles[activeCycleIndex].title}
                        </h3>
                        <p className="text-lg text-slate-300 leading-relaxed">
                          {currentCompData.cycles[activeCycleIndex].description}
                        </p>
                      </div>
                    </div>

                    {/* Cycles List */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 max-h-[300px]">
                      {currentCompData.cycles.map((cycle, index) => (
                        <button
                          key={cycle.id}
                          onClick={() => setActiveCycleIndex(index)}
                          className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-4 ${
                            activeCycleIndex === index
                              ? 'bg-[rgba(0,240,255,0.1)] border-[var(--neon-blue)]'
                              : 'bg-black/20 border-transparent hover:bg-white/5'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-1 ${
                            activeCycleIndex === index ? 'bg-[var(--neon-blue)] text-black' : 'bg-white/10 text-slate-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex flex-col items-start text-left">
                            <span className={`font-medium ${activeCycleIndex === index ? 'text-white' : 'text-slate-300'}`}>
                              {cycle.title}
                            </span>
                            <span className={`text-xs mt-1 leading-snug ${activeCycleIndex === index ? 'text-slate-200' : 'text-slate-500'}`}>
                              {cycle.description}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
