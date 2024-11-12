// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import StartScreen from './pages/StartScreen';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import { ThemeProvider } from './theme/ThemeContext';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  if (!isInitialized) {
    return (
      <ThemeProvider>
        <StartScreen onStart={() => setIsInitialized(true)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;