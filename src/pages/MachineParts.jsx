import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const initialDcmParts = [
  {
    "name": "Conveyor",
    "function": "Transports the produced parts/flashes/scraps to the next stage of the process.",
    "images": [
      "/assets/components/conveyor1.png",
      "/assets/components/conveyor2.png"
    ],
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
        "left": 4.88599348534202,
        "top": 56.306446589847404,
        "width": 33.22475570032573,
        "height": 9.716599190283397,
        "type": "box"
      },
      {
        "left": 43.97394136807817,
        "top": 62.03674867642479,
        "width": 21.661237785016283,
        "height": 20.4297726564933,
        "type": "box"
      },
      {
        "left": 32.08469055374593,
        "top": 39.36468389909685,
        "width": 6.677524429967427,
        "height": 28.40236686390532,
        "type": "box"
      }
    ]
  },
  {
    "name": "Robot Extractor",
    "function": "Automatically removes the part from the die after the machine opens.",
    "images": ["/assets/components/robot-extractor.png"],
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
    "images": ["/assets/components/die.png"],
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
    "images": ["/assets/components/plunger.png"],
    "x": 55,
    "y": 50,
    "mapId": 1,
    "areas": [
      {
        "left": 13.925081433224756,
        "top": 35.03313166234515,
        "width": 22.638436482084693,
        "height": 10.141169691731484,
        "type": "box"
      }
    ]
  },
  {
    "name": "Robot Sprayer",
    "function": "Applies release agent and/or cooling to the die between cycles.",
    "images": ["/assets/components/sprayer.png"],
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
    "images": ["/assets/components/ladle.png"],
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
    "images": ["/assets/components/furnance.png"],
    "x": 80,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 9.93485342019544,
        "top": 19.682341949548427,
        "width": 14.657980456026058,
        "height": 12.457178449081287,
        "type": "box"
      }
    ]
  },

  {
    "name": "Tie Bars",
    "function": "Clamping columns that support the locking force of the die during injection.",
    "images": ["/assets/components/tie-bar.png"],
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
    "images": ["/assets/components/ejector.png"],
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
    "images": [
      "/assets/components/hmi.png"
    ],
    "x": 10,
    "y": 40,
    "mapId": 1,
    "areas": [
      {
        "left": 31.107491856677527,
        "top": 22.42292120834631,
        "width": 5.8631921824104225,
        "height": 9.218312052320147,
        "type": "box"
      },
      {
        "left": 64.33224755700326,
        "top": 69.76019931485519,
        "width": 4.071661237785008,
        "height": 6.477732793522264,
        "type": "box"
      },
      {
        "left": 55.37459283387622,
        "top": 83.4630956088446,
        "width": 6.351791530944631,
        "height": 8.470881345375261,
        "type": "box"
      }
    ]
  },

  {
    "name": "Trim Press",
    "function": "Machine used to trim excess metal (flash) and runners from the cast part.",
    "images": [
      "/assets/components/trimpress.png"
    ],
    "x": 80,
    "y": 80,
    "mapId": 1,
    "areas": [
      {
        "left": 29.80456026058632,
        "top": 65.52475864216754,
        "width": 10.097719869706843,
        "height": 13.453752725007789,
        "type": "box"
      }
    ]
  },
  {
    "name": "TCU",
    "function": "Temperature Control Unit. Maintains the die at the optimal operating temperature.",
    "images": [
      "/assets/components/tcu1.png",
      "/assets/components/tcu2.png"
    ],
    "x": 20,
    "y": 20,
    "mapId": 1,
    "areas": [
      {
        "left": 44.62540716612378,
        "top": 13.204609156026159,
        "width": 19.21824104234527,
        "height": 13.204609156026159,
        "type": "box"
      }
    ]
  },
  {
    "name": "Vacuum Valve",
    "function": "Extracts air and gases from the die cavity before metal injection to reduce porosity.",
    "images": [
      "/assets/components/valves.png"
    ],
    "x": 30,
    "y": 20,
    "mapId": 1,
    "areas": [
      {
        "left": 31.39389229543999,
        "top": 33.39285405022781,
        "width": 5.880522378109582,
        "height": 14.249998912811364,
        "type": "box"
      }
    ]
  }
];

export default function MachineParts() {
  const [parts, setParts] = useState(initialDcmParts);
  const [selectedPart, setSelectedPart] = useState(initialDcmParts[0]);

  // Mapping Mode State
  const [isMappingMode, setIsMappingMode] = useState(false);
  const mapRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePartClick = (part) => {
    if (isMappingMode && isDrawing) return; // prevent selecting while drawing
    setSelectedPart(part);
    setIsDropdownOpen(false);
    setCurrentImageIndex(0);
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

  const currentMapImg = '/assets/untagged-dcm-layout.png';
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

        <header className="text-center mb-8 relative pt-8 w-full z-30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-[#ff6400] blur-[100px] opacity-20 -z-10 rounded-full pointer-events-none"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-['Share_Tech_Mono'] bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            DCM <span className="bg-gradient-to-br from-[#ff6400] to-[#ff0064] bg-clip-text text-transparent">COMPONENTS</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-[700px] mx-auto mb-6">
            Explore the core components and systems. Select a part to view its details and location.
          </p>

          {/* Main Dropdown */}
          <div className="relative max-w-md mx-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 transition-colors border border-white/20 px-6 py-4 rounded-xl font-['Share_Tech_Mono'] text-xl text-white shadow-[0_5px_20px_rgba(0,0,0,0.4)] backdrop-blur-md"
            >
              <span>{selectedPart ? selectedPart.name : 'Select a Component'}</span>
              <span className={`text-[#ff6400] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-[#1a1a1a] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {parts.map((part, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handlePartClick(part);
                      }}
                      className={`cursor-pointer px-6 py-4 border-b border-white/5 transition-colors duration-200
                        ${selectedPart?.name === part.name
                          ? 'bg-[#ff6400]/20 text-[#ffb480] font-bold'
                          : 'text-white hover:bg-white/10 hover:text-[#ffb480]'}`}
                    >
                      <span className="font-['Share_Tech_Mono'] text-lg">{part.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-4 z-10">

          {/* Component Image and Details (Left Side) */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative flex flex-col h-full overflow-hidden group">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-[#ff6400] to-transparent opacity-10 blur-[50px] rounded-full pointer-events-none -z-10 group-hover:opacity-20 transition-opacity duration-700"></div>

              {selectedPart ? (
                <>
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-6 bg-black/40 shadow-inner relative flex items-center justify-center group/image">
                    {/* Placeholder for component image */}
                    <img
                      src={selectedPart.images?.[currentImageIndex] || `https://placehold.co/800x450/111111/ff6400?text=${encodeURIComponent(selectedPart.name)}`}
                      alt={selectedPart.name}
                      className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Image Navigation */}
                    {selectedPart.images && selectedPart.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedPart.images.length - 1));
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#ff6400] text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover/image:opacity-100 z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        >
                          ◀
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => (prev < selectedPart.images.length - 1 ? prev + 1 : 0));
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#ff6400] text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover/image:opacity-100 z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        >
                          ▶
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                          {selectedPart.images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-[#ff6400] w-6' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div className="absolute inset-0 border-2 border-white/5 rounded-xl pointer-events-none"></div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4 text-white font-['Share_Tech_Mono'] flex items-center">
                      <span className="bg-gradient-to-r from-[#ffb480] to-[#ff0064] bg-clip-text text-transparent">{selectedPart.name}</span>
                    </h2>
                    <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-4"></div>
                    <p className="text-xl text-slate-300 leading-relaxed font-light">
                      {selectedPart.function}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50 py-20">
                  <span className="text-4xl mb-4">🔍</span>
                  <p className="text-xl font-['Share_Tech_Mono']">Select a component from<br />the dropdown to view details</p>
                </div>
              )}
            </div>
          </div>

          {/* Map Viewer (Right Side) */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white font-['Share_Tech_Mono'] flex items-center gap-2">
                  <span className="text-[#ff6400]">📍</span> Location Map
                </h3>
                <button
                  onClick={() => setIsMappingMode(!isMappingMode)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold font-['Share_Tech_Mono'] transition-all ${
                    isMappingMode 
                      ? 'bg-[#ff6400] text-white shadow-[0_0_15px_rgba(255,100,0,0.5)]' 
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {isMappingMode ? 'Mapping: ON' : 'Mapping: OFF'}
                </button>
              </div>

              {isMappingMode && (
                <div className="flex gap-2 mb-4">
                  <button 
                    onClick={() => selectedPart && handleClearAreas(selectedPart.name)}
                    className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded text-sm transition-colors border border-red-500/50 font-bold"
                  >
                    Clear Areas
                  </button>
                  <button 
                    onClick={copyJsonToClipboard}
                    className="px-3 py-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/40 rounded text-sm transition-colors border border-green-500/50 font-bold"
                  >
                    Copy Config
                  </button>
                </div>
              )}

              <div
                ref={mapRef}
                className={`relative w-full flex-1 min-h-[400px] bg-black/60 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center ${isMappingMode ? 'cursor-crosshair' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ userSelect: isDrawing ? 'none' : 'auto' }}
              >
                <img src={currentMapImg} alt="DCM Layout Map" className="w-full h-full object-contain pointer-events-none p-4" />

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
                              : 'border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/60'}`}
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
                              : 'bg-black/50 border-white/50 hover:scale-110 hover:bg-white/20'}`}
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
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles embedded */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 100, 0, 0.2);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 100, 0, 0.5);
          border: 2px solid transparent;
          background-clip: padding-box;
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
