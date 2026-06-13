import { useState, useEffect } from 'react';

export default function PartDetails({ selectedPart }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when part changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedPart]);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative flex flex-col h-full overflow-hidden group">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-[#ff6400] to-transparent opacity-10 blur-[50px] rounded-full pointer-events-none -z-10 group-hover:opacity-20 transition-opacity duration-700"></div>

        {selectedPart ? (
          <>
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-6 bg-black/40 shadow-inner relative flex items-center justify-center group/image">
              {/* Placeholder for component image or video */}
              {(() => {
                const src = selectedPart.images?.[currentImageIndex] || `https://placehold.co/800x450/111111/ff6400?text=${encodeURIComponent(selectedPart.name)}`;
                if (String(src).endsWith('.mp4')) {
                  return (
                    <video
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                    />
                  );
                }
                return (
                  <img
                    src={src}
                    alt={selectedPart.name}
                    className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                  />
                );
              })()}

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
            <span className="text-4xl mb-4">🔧</span>
            <p className="text-xl font-['Share_Tech_Mono']">Select a component from<br />the dropdown to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
