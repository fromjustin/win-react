import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import './App.css';

// Import our pages
import SignupPage from './pages/SignupPage';
import SignupFlow from './pages/SignupFlow';
import DashboardPage from './pages/DashboardPage';
import OutreachPage from './pages/OutreachPage';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/steps" element={<SignupFlow />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/outreach" element={<OutreachPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
