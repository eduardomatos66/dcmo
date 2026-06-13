import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scenarios } from '../modules/lockout/data/scenarios';
import './LockoutLayout.css';

export default function LockoutLayout() {
  const [activeScenario, setActiveScenario] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [photoUrls, setPhotoUrls] = useState([]);
  
  useEffect(() => {
    // Load photos from public assets
    const urls = [
      '/assets/lockout/lockout_item1.jpg',
      '/assets/lockout/lockout_item2.jpg',
      '/assets/lockout/lockout_item3.jpg',
      '/assets/lockout/20260528_033637.jpg',
      '/assets/lockout/20260528_033655.jpg',
      '/assets/lockout/20260528_033656.jpg',
      '/assets/lockout/20260528_033658.jpg'
    ];
    setPhotoUrls(urls);
  }, []);

  const handleScenarioSelect = (scenario) => {
    if (activeScenario?.id === scenario.id) {
      setActiveScenario(null);
    } else {
      setActiveScenario(scenario);
    }
    
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const isActiveTag = (tagText) => {
    if (!activeScenario) return false;
    return activeScenario.tags.includes(tagText);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-[var(--bg-dark)] text-[var(--text-main)] overflow-hidden font-['Inter']">
      
      {/* Sidebar */}
      <aside className="w-full md:w-[320px] bg-[var(--bg-panel)] border-b md:border-b-0 md:border-r border-white/10 flex flex-col backdrop-blur-md z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] md:shadow-[4px_0_24px_rgba(0,0,0,0.5)] relative">
        <div className="p-4 md:p-6 border-b border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/" className="lockout-home-link flex items-center gap-2 text-[var(--neon-blue)] hover:text-white transition-colors text-sm font-bold uppercase tracking-wider no-underline">
              <span>←</span> Home
            </Link>
          </div>
          <h2 className="font-['Share_Tech_Mono'] text-xl md:text-2xl bg-gradient-to-br from-[var(--neon-blue)] to-[#b400ff] bg-clip-text text-transparent tracking-widest uppercase mb-1 md:mb-2 font-bold">
            LOCKOUT SCENARIOS
          </h2>
          <p className="hidden md:block text-sm text-[var(--text-muted)] m-0">
            Select a scenario to highlight the required lockout points
          </p>
          
          <button 
            onClick={() => setShowPhotos(true)}
            className="mt-3 md:mt-2 p-2.5 bg-[#28a745] text-white border-none rounded cursor-pointer text-sm font-bold w-full flex justify-center items-center gap-2"
          >
            📸 View Lockout Photos
          </button>

          <button 
            className="md:hidden block w-full bg-purple-800/60 text-white border border-[var(--primary-accent-light)] p-3 text-base font-bold rounded-md mt-4 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ▼ {activeScenario ? activeScenario.title : 'Select Scenario'}
          </button>
        </div>

        <ul className={`list-none p-0 m-0 flex-grow overflow-y-auto ${isMobileMenuOpen ? 'block absolute top-full left-0 w-full bg-[var(--bg-dark)] max-h-[50vh] shadow-[0_10px_20px_rgba(0,0,0,0.8)] z-[100] border-b border-white/10' : 'hidden md:block'}`}>
          {scenarios.map(scenario => (
            <li 
              key={scenario.id}
              onClick={() => handleScenarioSelect(scenario)}
              className={`p-4 md:px-6 md:py-4 border-b border-white/5 cursor-pointer transition-all duration-300 relative hover:bg-white/5 hover:pl-6 ${activeScenario?.id === scenario.id ? 'bg-purple-800/20 border-l-4 border-l-[var(--primary-accent-light)] pl-5 md:pl-6' : ''}`}
            >
              <span className="font-semibold text-base block mb-1">{scenario.title}</span>
              <span className="text-xs text-[var(--text-muted)] block">{scenario.desc}</span>
            </li>
          ))}
        </ul>


      </aside>

      {/* Main Content */}
      <main className="flex-grow relative overflow-auto bg-[radial-gradient(circle_at_center,#1e2235_0%,#0f111a_100%)] flex justify-center items-start md:items-center p-3 md:p-10">
        <div className="w-full h-full flex justify-center items-center">
          <div className="relative w-[1200px] max-w-full m-auto bg-white border-4 border-gray-900 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <img src="/assets/untagged-dcm-layout.png" alt="Layout" className="w-full block" />

            {/* Standard Point Tags */}
            {[
              { type: 'e-tag', id: 'E-7', top: '7.78%', left: '10.44%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-6', top: '8.62%', left: '38.49%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-5', top: '5.26%', left: '71.02%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-1', top: '13.01%', left: '76%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-8', top: '32.7%', left: '6.17%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-9', top: '83.38%', left: '15.5%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-12', top: '90.51%', left: '29.17%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-10', top: '91.64%', left: '48.61%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-4', top: '73%', left: '75%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-2', top: '73.55%', left: '93.41%', bg: '#f4a261', color: '#111' },
              { type: 'e-tag', id: 'E-3', top: '92.06%', left: '93.41%', bg: '#f4a261', color: '#111' },
              { type: 'a-tag', id: 'A-2', top: '4.1%', left: '27.36%', bg: '#5b8cff', color: 'white' },
              { type: 'a-tag', id: 'A-1', top: '20%', left: '82%', bg: '#5b8cff', color: 'white' },
              { type: 'a-tag', id: 'A-7', top: '23%', left: '82%', bg: '#5b8cff', color: 'white' },
              { type: 'a-tag', id: 'A-3', top: '35.54%', left: '6.35%', bg: '#5b8cff', color: 'white' },
              { type: 'a-tag', id: 'A-5', top: '52.55%', left: '9.52%', bg: '#5b8cff', color: 'white' },
              { type: 'a-tag', id: 'A-4', top: '83.61%', left: '20.82%', bg: '#5b8cff', color: 'white' },
              { type: 'a-tag', id: 'A-6', top: '89.86%', left: '39.03%', bg: '#5b8cff', color: 'white' },
              { type: 'c-tag', id: 'C-3', top: '11.46%', left: '23.8%', bg: '#8bd17c', color: '#111' },
              { type: 'c-tag', id: 'C-1', top: '62.84%', left: '68.86%', bg: '#8bd17c', color: '#111' },
              { type: 'c-tag', id: 'C-2', top: '91.09%', left: '44.47%', bg: '#8bd17c', color: '#111' },
            ].map(tag => (
              <div 
                key={tag.id}
                className={`absolute px-2.5 py-1 rounded text-sm font-bold shadow-md transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isActiveTag(tag.id) ? 'opacity-100 pointer-events-auto scale-100 animate-[tagPulse_1.5s_infinite] z-10' : 'opacity-0 pointer-events-none scale-75'}`}
                style={{ top: tag.top, left: tag.left, background: tag.bg, color: tag.color, transform: isActiveTag(tag.id) ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.8)' }}
              >
                {tag.id}
              </div>
            ))}

            {/* TCU AREA */}
            <div 
              className={`tcu-area absolute border-4 border-dashed border-yellow-400 bg-yellow-400/20 text-white rounded flex justify-center items-center text-lg shadow-[1px_1px_3px_black] transition-all duration-300 ${isActiveTag('TCU AREA') ? 'opacity-100 pointer-events-auto animate-[pulseArea_2s_infinite] z-10' : 'opacity-0 pointer-events-none'}`}
            ></div>
          </div>
        </div>
      </main>

      {/* Photos Modal */}
      {showPhotos && (
        <div className="fixed inset-0 w-screen h-screen bg-black/85 flex items-center justify-center z-[1000] backdrop-blur-sm" onClick={() => setShowPhotos(false)}>
          <div className="bg-[#1a1a1a] border-2 border-[#28a745] rounded-lg w-[90%] max-w-[1000px] max-h-[90vh] shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col text-white" onClick={e => e.stopPropagation()}>
            <div className="bg-[#28a74533] border-b border-[#28a745] p-4 flex justify-between items-center font-bold">
              <span className="font-['Share_Tech_Mono'] text-lg tracking-widest">LOCKOUT EXAMPLES</span>
              <button className="bg-transparent border-none text-white text-3xl cursor-pointer leading-none hover:text-red-400" onClick={() => setShowPhotos(false)}>&times;</button>
            </div>
            <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {photoUrls.map((url, i) => (
                <img 
                  key={i} 
                  src={url} 
                  alt={`Lockout Item ${i+1}`} 
                  className="w-full h-[250px] object-cover rounded-lg border-2 border-[#28a745] cursor-pointer hover:scale-105 hover:shadow-[0_5px_15px_rgba(40,167,69,0.5)] transition-all duration-200"
                  onClick={() => window.open(url, '_blank')}
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
