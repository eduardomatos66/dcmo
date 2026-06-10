import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import mapImg1 from '../../assets/lockout/20260528_033655.jpg';

const initialDcmParts = [
  {
    "name": "Conveyor",
    "function": "Transports the produced parts to the next stage of the process.",
    "x": 15,
    "y": 80,
    "mapId": 1,
    "box": {
      "left": 8.727034120734908,
      "top": 56.926217556138816,
      "width": 32.41469816272966,
      "height": 12.598425196850393
    },
    "areas": [
      {
        "left": 7.808398950131233,
        "top": 58.326042578011084,
        "width": 31.23359580052493,
        "height": 10.498687664041995,
        "type": "box"
      },
      {
        "left": 44.94750656167979,
        "top": 63.458734324876055,
        "width": 22.834645669291334,
        "height": 23.797025371828532,
        "type": "box"
      },
      {
        "left": 34.31758530183727,
        "top": 38.028579760863224,
        "width": 3.8057742782152246,
        "height": 18.197725284339462,
        "type": "box"
      }
    ]
  },
  {
    "name": "Robot Extractor",
    "function": "Automatically removes the part from the die after the machine opens.",
    "x": 14.501312335958005,
    "y": 63.6920384951881,
    "mapId": 1,
    "areas": [
      {
        "left": 35.36745406824147,
        "top": 48.99387576552931,
        "width": 8.136482939632543,
        "height": 13.065033537474484,
        "type": "box"
      }
    ]
  },
  {
    "name": "Die",
    "function": "Metal mold where molten aluminum is injected to form the part.",
    "x": 40,
    "y": 50,
    "mapId": 1,
    "areas": [
      {
        "left": 31.036745406824146,
        "top": 29.862933799941676,
        "width": 16.535433070866148,
        "height": 15.398075240594924,
        "type": "box"
      }
    ]
  },
  {
    "name": "Plunger/Shot Sleeve",
    "function": "Piston that pushes the molten metal into the die under high pressure, and the injection chamber where liquid metal is deposited.",
    "x": 55,
    "y": 50,
    "mapId": 1,
    "areas": [
      {
        "left": 18.175853018372703,
        "top": 33.36249635462234,
        "width": 14.96062992125984,
        "height": 9.798775153105865,
        "type": "box"
      }
    ]
  },
  {
    "name": "Robot Sprayer",
    "function": "Applies release agent and/or cooling to the die between cycles.",
    "x": 40,
    "y": 30,
    "mapId": 1,
    "areas": [
      {
        "left": 28.41207349081365,
        "top": 25.896762904636923,
        "width": 7.874015748031493,
        "height": 12.131816856226301,
        "type": "box"
      }
    ]
  },
  {
    "name": "Ladle",
    "function": "Automatic or manual cup that transfers molten metal from the furnace to the injection chamber.",
    "x": 65,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 15.68241469816273,
        "top": 18.4310294546515,
        "width": 16.666666666666664,
        "height": 21.69728783902012,
        "type": "box"
      }
    ]
  },
  {
    "name": "Furnace",
    "function": "Furnace that keeps the aluminum (or other metal) molten at the proper temperature.",
    "x": 80,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 12.926509186351707,
        "top": 20.06415864683581,
        "width": 14.04199475065617,
        "height": 10.03207932341791,
        "type": "box"
      }
    ]
  },

  {
    "name": "Tie Bars",
    "function": "Clamping columns that support the locking force of the die during injection.",
    "x": 35,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 28.937007874015748,
        "top": 28.9297171186935,
        "width": 23.884514435695543,
        "height": 4.666083406240883,
        "type": "box"
      },
      {
        "left": 28.018372703412076,
        "top": 43.62787984835229,
        "width": 24.409448818897637,
        "height": 3.499562554680658,
        "type": "box"
      }
    ]
  },
  {
    "name": "Ejector System",
    "function": "Extraction/ejection system to release and push the part out of the die.",
    "x": 25,
    "y": 50,
    "mapId": 1,
    "areas": [
      {
        "left": 41.01049868766404,
        "top": 27.52989209682123,
        "width": 6.955380577427825,
        "height": 22.630504520268303,
        "type": "box"
      }
    ]
  },
  {
    "name": "HMI/Control Panel",
    "function": "Operation panel (Human-Machine Interface) for configuring and monitoring the process.",
    "x": 10,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 52.95275590551181,
        "top": 88.18897637795276,
        "width": 9.58005249343833,
        "height": 10.965296004666087,
        "type": "box"
      },
      {
        "left": 65.02624671916011,
        "top": 52.726742490522014,
        "width": 6.82414698162728,
        "height": 10.498687664041995,
        "type": "box"
      },
      {
        "left": 32.349081364829395,
        "top": 22.397200349956258,
        "width": 8.792650918635168,
        "height": 8.63225430154564,
        "type": "box"
      }
    ]
  },

  {
    "name": "Trim Press",
    "function": "Machine used to trim excess metal (flash) and runners from the cast part.",
    "x": 80,
    "y": 80,
    "mapId": 1,
    "areas": [
      {
        "left": 31.561679790026247,
        "top": 68.35812190142899,
        "width": 8.792650918635168,
        "height": 14.464858559346752,
        "type": "box"
      }
    ]
  }
];

export default function MachineParts() {
  const [parts, setParts] = useState(initialDcmParts);
  const [selectedPart, setSelectedPart] = useState(null);
  
  // Mapping Mode State
  const [isMappingMode, setIsMappingMode] = useState(false);
  const mapRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePartClick = (part) => {
    if (isMappingMode && isDrawing) return; // prevent selecting while drawing
    setSelectedPart(part);
  };

  const handleMouseDown = (e) => {
    if (!isMappingMode || !selectedPart) return;
    e.preventDefault();
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setIsDrawing(true);
    setDrawStart({ x, y });
    setCurrentBox({ left: x, top: y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = mapRef.current.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;
    
    const clampedX = Math.max(0, Math.min(100, currentX));
    const clampedY = Math.max(0, Math.min(100, currentY));
    
    const left = Math.min(drawStart.x, clampedX);
    const top = Math.min(drawStart.y, clampedY);
    const width = Math.abs(clampedX - drawStart.x);
    const height = Math.abs(clampedY - drawStart.y);
    
    setCurrentBox({ left, top, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    if (currentBox && currentBox.width > 0.5 && currentBox.height > 0.5) {
      setParts(parts.map(p => {
        if (p.name === selectedPart.name) {
          return { ...p, areas: [...(p.areas || []), { ...currentBox, type: 'box' }] };
        }
        return p;
      }));
    } else if (currentBox) {
      // If just clicked, add a point
      setParts(parts.map(p => {
        if (p.name === selectedPart.name) {
          return { ...p, areas: [...(p.areas || []), { left: currentBox.left, top: currentBox.top, type: 'point' }] };
        }
        return p;
      }));
    }
    setCurrentBox(null);
  };

  const handleMouseLeave = () => {
    if (isDrawing) {
      handleMouseUp();
    }
  };

  const handleClearAreas = (partName) => {
    setParts(parts.map(p => p.name === partName ? { ...p, areas: [] } : p));
  };

  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(parts, null, 2));
    alert('Parts JSON copied to clipboard!');
  };

  const currentMapImg = mapImg1;
  const visibleParts = isMappingMode 
    ? parts 
    : (selectedPart ? [parts.find(p => p.name === selectedPart.name)].filter(Boolean) : []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[var(--bg-dark)] text-white"
         style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255, 100, 0, 0.08), transparent 25%), radial-gradient(circle at 90% 80%, rgba(255, 0, 100, 0.08), transparent 25%)' }}>
      
      <div className="max-w-[1400px] mx-auto w-full px-5 py-10 flex flex-col items-center flex-1 relative">
        <Link 
          to="/"
          className="absolute top-5 left-5 text-[0.9rem] px-3 py-2 bg-[rgba(255,255,255,0.1)] border border-white/20 text-white cursor-pointer rounded-md backdrop-blur-sm flex items-center gap-2 font-semibold hover:bg-white/20 transition-all z-10"
        >
          ← Back to Home
        </Link>

        <header className="text-center mb-10 relative pt-8 w-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-[#ff6400] blur-[100px] opacity-20 -z-10 rounded-full"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-['Share_Tech_Mono'] bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            DCM <span className="bg-gradient-to-br from-[#ff6400] to-[#ff0064] bg-clip-text text-transparent">COMPONENTS</span>
          </h1>
          <p className="hidden md:block text-lg text-slate-400 max-w-[700px] mx-auto">
            Explore the core components and systems. Select a part to view its location on the layout.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* List of parts (Left side) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Mapping Mode Toggle (Hidden for now) */}
            {false && (
              <div className="flex gap-4 mb-2 justify-between items-center bg-white/5 border border-white/10 rounded-lg p-3">
                <span className="font-['Share_Tech_Mono'] font-bold text-lg">Mapping Mode</span>
                <button 
                  onClick={() => setIsMappingMode(!isMappingMode)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${isMappingMode ? 'bg-[#ff0064]/20 border border-[#ff0064]/50 text-[#ff80b4]' : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'}`}
                >
                  {isMappingMode ? 'ON' : 'OFF'}
                </button>
              </div>
            )}
            
            {isMappingMode && (
              <div className="mb-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-200">
                <p className="mb-2"><strong>Instructions:</strong> Select a component below, then click and drag on the map to draw its bounding box. You can map multiple areas per component.</p>
                <div className="flex gap-2">
                  <button 
                    onClick={copyJsonToClipboard}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded transition-colors"
                  >
                    📋 Copy JSON
                  </button>
                  {selectedPart && (
                    <button 
                      onClick={() => handleClearAreas(selectedPart.name)}
                      className="px-4 py-2 bg-red-600/50 hover:bg-red-500 text-white font-bold rounded transition-colors"
                      title="Clear areas for selected component"
                    >
                      🗑️ Clear Selected
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Dropdown Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 transition-colors border border-white/20 p-4 rounded-lg font-['Share_Tech_Mono'] text-lg text-white mb-2 shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
              >
                <span>{selectedPart ? selectedPart.name : 'Select a Component'}</span>
                <span className="text-[#ff6400]">{isMobileMenuOpen ? '▲' : '▼'}</span>
              </button>
            </div>

            <div className={`${isMobileMenuOpen ? 'grid' : 'hidden md:grid'} grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-2 max-h-[60vh] custom-scrollbar`}>
              {parts.map((part, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    handlePartClick(part);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`cursor-pointer group relative rounded-lg p-4 border backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]
                    ${selectedPart?.name === part.name 
                      ? 'bg-gradient-to-br from-[#ff6400]/20 to-[#ff0064]/20 border-[#ff6400]/50' 
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'}`}
                >
                  <h3 className={`text-lg font-bold font-['Share_Tech_Mono'] transition-colors duration-300
                    ${selectedPart?.name === part.name ? 'text-[#ffb480]' : 'text-white group-hover:text-[#ffb480]'}`}>
                    {part.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Map and Details panel (Right side) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Map Viewer */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-lg shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative">
               <div 
                 ref={mapRef}
                 className={`relative w-full aspect-video bg-black/60 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center ${isMappingMode ? 'cursor-crosshair' : ''}`}
                 onMouseDown={handleMouseDown}
                 onMouseMove={handleMouseMove}
                 onMouseUp={handleMouseUp}
                 onMouseLeave={handleMouseLeave}
                 style={{ userSelect: isDrawing ? 'none' : 'auto' }}
               >
                  <img src={currentMapImg} alt="DCM Layout Map" className="max-w-full max-h-full object-contain pointer-events-none" />
                  
                  {/* Overlay markers */}
                  {visibleParts.flatMap((part, i) => {
                    return (part.areas || []).map((area, j) => {
                      if (area.type === 'box') {
                        return (
                          <div 
                            key={`${i}-${j}`}
                            onClick={(e) => { e.stopPropagation(); handlePartClick(part); }}
                            className={`absolute cursor-pointer border-4 border-dashed rounded flex justify-center items-center shadow-[1px_1px_3px_black] transition-all duration-300 z-10 group
                              ${selectedPart?.name === part.name 
                                ? 'border-yellow-400 bg-yellow-400/30 animate-[pulseArea_2s_infinite]' 
                                : 'border-yellow-400/60 bg-yellow-400/10 hover:bg-yellow-400/20 hover:border-yellow-400'}`}
                            style={{ top: `${area.top}%`, left: `${area.left}%`, width: `${area.width}%`, height: `${area.height}%` }}
                            title={part.name}
                          >
                            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded text-sm font-bold font-['Share_Tech_Mono'] whitespace-nowrap transition-all pointer-events-none
                              ${selectedPart?.name === part.name ? 'opacity-100 visible text-yellow-300' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible text-white'}
                            `}>
                              {part.name}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div 
                            key={`${i}-${j}`}
                            onClick={(e) => { e.stopPropagation(); handlePartClick(part); }}
                            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-10"
                            style={{ left: `${area.left}%`, top: `${area.top}%` }}
                            title={part.name}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all duration-300
                              ${selectedPart?.name === part.name 
                                ? 'bg-[#ff6400] border-white scale-125 animate-pulse shadow-[0_0_20px_#ff6400]' 
                                : 'bg-black/50 border-[#ffb480] hover:scale-110 hover:bg-[#ff6400]/50'}`}
                            >
                               <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded text-sm font-bold font-['Share_Tech_Mono'] whitespace-nowrap transition-all pointer-events-none
                              ${selectedPart?.name === part.name ? 'opacity-100 visible text-[#ffb480]' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible text-white'}
                            `}>
                              {part.name}
                            </div>
                          </div>
                        );
                      }
                    });
                  })}

                  {/* Current Drawing Box */}
                  {isDrawing && currentBox && (
                    <div 
                      className="absolute border-4 border-dashed border-white bg-white/20 z-20 pointer-events-none"
                      style={{ 
                        left: `${currentBox.left}%`, 
                        top: `${currentBox.top}%`, 
                        width: `${currentBox.width}%`, 
                        height: `${currentBox.height}%` 
                      }}
                    ></div>
                  )}
               </div>
            </div>

            {/* Details Panel */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg flex flex-col min-h-[200px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
              {selectedPart ? (
                <>
                  <div className="absolute -top-1/2 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.1),transparent_60%)] pointer-events-none -z-10"></div>
                  <h2 className="text-2xl font-bold mb-3 text-white font-['Share_Tech_Mono'] border-b border-white/10 pb-3 flex items-center justify-between">
                    <span>{selectedPart.name}</span>
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {selectedPart.function}
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50 py-10">
                  <div className="w-12 h-12 border-2 border-dashed border-white/30 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl">📍</span>
                  </div>
                  <p className="text-lg font-['Share_Tech_Mono']">Select a component<br/>to view details & location</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      
      {/* Custom Scrollbar Styles embedded */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 100, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 100, 0, 0.5);
        }
        @keyframes pulseArea {
          0% { box-shadow: 0 0 0 rgba(255, 235, 59, 0.4); }
          50% { box-shadow: 0 0 20px rgba(255, 235, 59, 0.8); }
          100% { box-shadow: 0 0 0 rgba(255, 235, 59, 0.4); }
        }
      `}</style>
    </div>
  );
}
