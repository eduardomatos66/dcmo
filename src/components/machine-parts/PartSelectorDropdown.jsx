import { useState  } from 'react';

export default function PartSelectorDropdown({ parts, selectedPart, handlePartClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
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
                  setIsDropdownOpen(false);
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
  );
}
