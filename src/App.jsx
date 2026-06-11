import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PanelSimulator from './pages/PanelSimulator';
import LockoutLayout from './pages/LockoutLayout';
import TrimSimulator from './pages/TrimSimulator';
import MachineParts from './pages/MachineParts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel" element={<PanelSimulator />} />
        <Route path="/lockout-layout" element={<LockoutLayout />} />
        <Route path="/trim-simulator" element={<TrimSimulator />} />
        <Route path="/machine-parts" element={<MachineParts />} />
      </Routes>
    </Router>
  );
}

export default App;
