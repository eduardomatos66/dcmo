import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PanelSimulator from './pages/PanelSimulator';
import LockoutLayout from './pages/LockoutLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel" element={<PanelSimulator />} />
        <Route path="/lockout-layout" element={<LockoutLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
