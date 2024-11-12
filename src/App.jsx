// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import StartScreen from './pages/StartScreen';
import HomePage from './pages/HomePage';
import { useState } from 'react';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  if (!isInitialized) {
    return <StartScreen onStart={() => setIsInitialized(true)} />;
  }

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Weitere Routen kommen später hier hin */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;