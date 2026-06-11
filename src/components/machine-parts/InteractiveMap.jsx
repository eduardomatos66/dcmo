import React, { useRef, useState } from 'react';

export default function InteractiveMap({
  parts,
  setParts,
  selectedPart,
  isMappingMode,
  setIsMappingMode,
  handlePartClick
}) {
  const mapRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState(null);

  const currentMapImg = '/assets/untagged-dcm-layout.png';
  const visibleParts = isMappingMode
    ? parts
    : (selectedPart ? [parts.find(p => p.name === selectedPart.name)].filter(Boolean) : []);

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

  return (
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
  );
}
