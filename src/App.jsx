// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import StartScreen from './pages/StartScreen';
import WorkoutPage from './pages/WorkoutPage';
import HomePage from './pages/HomePage';
import { MainLayout } from './components/Layout/MainLayout';

function App() {
  const [isInitialized, setIsInitialized] = useState(() => {
    // Check if user has already started the app
    return localStorage.getItem('isInitialized') === 'true';
  });

  const handleStart = () => {
    setIsInitialized(true);
    localStorage.setItem('isInitialized', 'true');
  };

  const handleExit = () => {
    setIsInitialized(false);
    localStorage.setItem('isInitialized', 'false');
  };

  if (!isInitialized) {
    return (
      <ThemeProvider>
        <StartScreen onStart={handleStart} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <MainLayout onExit={handleExit}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workout" element={<WorkoutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;