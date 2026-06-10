import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[var(--bg-dark)] text-white"
         style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(0, 240, 255, 0.08), transparent 25%), radial-gradient(circle at 85% 30%, rgba(180, 0, 255, 0.08), transparent 25%)' }}>
      
      <div className="max-w-[1200px] mx-auto w-full px-5 py-10 flex flex-col items-center flex-1 relative">
        <button 
          onClick={() => setShowQRModal(true)}
          className="absolute top-5 right-5 text-[0.9rem] px-3 py-2 bg-[rgba(0,240,255,0.1)] border border-[var(--neon-blue)] text-white cursor-pointer rounded-md backdrop-blur-sm flex items-center gap-2 font-semibold z-10"
        >
          📱 QR Code
        </button>

        <header className="text-center mb-16 relative pt-10 w-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-[var(--neon-blue)] blur-[100px] opacity-30 -z-10 rounded-full"></div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 font-['Share_Tech_Mono'] bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            DCM TRAINING <span className="bg-gradient-to-br from-[var(--neon-blue)] to-[#b400ff] bg-clip-text text-transparent">PORTAL</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-[600px] mx-auto">
            Select a module below to begin your training session.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1100px]">
          {/* Panel Simulator Card */}
          <Link to="/panel" className="group relative bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20 min-h-[320px]">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col h-full">
              <img src="/assets/PanelModule.png" alt="Panel Simulator" className="w-full h-40 object-contain p-2 rounded-lg mb-5 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.5)] bg-black/30" />
              <h2 className="text-3xl font-semibold mb-4 tracking-tight text-white">Panel Simulator</h2>
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                Interactive 3D-like digital replica of the machine's control panel. Practice real-world scenarios and button operations.
              </p>
              <span className="inline-flex items-center text-[0.95rem] font-semibold text-[var(--neon-blue)] uppercase tracking-wide">
                Launch Simulator <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>

          {/* Lockout Layout Card */}
          <Link to="/lockout-layout" className="group relative bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20 min-h-[320px]">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(180,0,255,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col h-full">
              <img src="/assets/LockoutModule.png" alt="Lockout Layout" className="w-full h-40 object-contain p-2 rounded-lg mb-5 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.5)] bg-black/30" />
              <h2 className="text-3xl font-semibold mb-4 tracking-tight text-white">Lockout Layout</h2>
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                Digital floor plan indicating safety lockout points. Learn where to isolate energy for various maintenance scenarios.
              </p>
              <span className="inline-flex items-center text-[0.95rem] font-semibold text-[#b400ff] uppercase tracking-wide">
                Launch Layout <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>

          {/* Trim Press Simulator Card */}
          <Link to="/trim-simulator" className="group relative bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20 min-h-[320px]">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col h-full">
              <img src="/assets/TrimPressModule.png" alt="Trim Press Simulator" className="w-full h-40 object-contain p-2 rounded-lg mb-5 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.5)] bg-black/30" />
              <h2 className="text-3xl font-semibold mb-4 tracking-tight text-white">Trim Press Sim</h2>
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                Full 3D digital twin of a trim press with live simulation and operational controls.
              </p>
              <span className="inline-flex items-center text-[0.95rem] font-semibold text-[#00ff64] uppercase tracking-wide">
                Launch Simulator <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>

          {/* Machine Parts Card */}
          <Link to="/machine-parts" className="group relative bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20 min-h-[320px]">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-full h-40 bg-gradient-to-br from-[#ff6400]/20 to-[#ff0064]/20 rounded-lg mb-5 border border-[#ff6400]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex items-center justify-center backdrop-blur-sm">
                 <span className="text-5xl">⚙️</span>
              </div>
              <h2 className="text-3xl font-semibold mb-4 tracking-tight text-white">DCM Parts</h2>
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                Explore the core components and systems of Die Casting Machines and learn their functions.
              </p>
              <span className="inline-flex items-center text-[0.95rem] font-semibold text-[#ff6400] uppercase tracking-wide">
                View Components <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>
        </main>

        <footer className="mt-auto pt-16 text-gray-500 text-sm text-center font-['Share_Tech_Mono']">
          <p>&copy; 2026 DCM Interactive Training Systems</p>
        </footer>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] backdrop-blur-[3px]" onClick={() => setShowQRModal(false)}>
          <div className="bg-[#1a1a1a] border-2 border-[var(--neon-blue)] rounded-lg w-[300px] shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col text-white" onClick={e => e.stopPropagation()}>
            <div className="bg-[rgba(0,240,255,0.15)] border-b border-[var(--neon-blue)] p-4 flex justify-between items-center font-bold">
              <span>CONNECT DEVICE</span>
              <button className="bg-transparent border-none text-white text-2xl cursor-pointer leading-none" onClick={() => setShowQRModal(false)}>&times;</button>
            </div>
            <div className="p-5 text-center">
              <p className="text-sm mb-4 text-gray-300">Scan to open simulator on your mobile device:</p>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://dcmo.vercel.app/" alt="QR Code" className="bg-white p-2 rounded-lg mb-4 max-w-full mx-auto" />
              <p className="text-[var(--neon-blue)] font-['Share_Tech_Mono']">https://dcmo.vercel.app/</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
