import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudyProvider } from './context/StudyContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PlanningPage from './pages/PlanningPage';
import ProgressPage from './pages/ProgressPage';
import FlashcardsPage from './pages/FlashcardsPage';

function App() {
  return (
    <StudyProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plan" element={<PlanningPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
          </Routes>
        </Layout>
      </Router>
    </StudyProvider>
  );
}

export default App;