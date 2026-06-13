import { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialDcmParts } from '../data/machinePartsData';
import PartDetails from '../components/machine-parts/PartDetails';
import InteractiveMap from '../components/machine-parts/InteractiveMap';
import PartSelectorDropdown from '../components/machine-parts/PartSelectorDropdown';
import './MachineParts.css';

export default function MachineParts() {
  const [parts, setParts] = useState(initialDcmParts);
  const [selectedPart, setSelectedPart] = useState(initialDcmParts[0]);
  const [isMappingMode, setIsMappingMode] = useState(false);

  const handlePartClick = (part) => {
    if (isMappingMode) return; // Optional: prevent changing selection while mapping? The original had a check: if (isMappingMode && isDrawing) return; Let's just set the part.
    // In the original: if (isMappingMode && isDrawing) return;
    // Since isDrawing is now inside InteractiveMap, we might lose this protection.
    // We can just rely on the user not clicking the dropdown while drawing.
    setSelectedPart(part);
  };

  return (
    <div className="machine-parts-bg min-h-screen flex flex-col overflow-x-hidden bg-[var(--bg-dark)] text-white">

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

          <PartSelectorDropdown
            parts={parts}
            selectedPart={selectedPart}
            handlePartClick={handlePartClick}
          />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-4 z-10">
          <PartDetails selectedPart={selectedPart} />
          <InteractiveMap
            parts={parts}
            setParts={setParts}
            selectedPart={selectedPart}
            isMappingMode={isMappingMode}
            setIsMappingMode={setIsMappingMode}
            handlePartClick={handlePartClick}
          />
        </div>
      </div>
    </div>
  );
}
