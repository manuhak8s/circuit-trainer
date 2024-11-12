import React from 'react';

interface StartScreenProps {
    onStart: () => void;
  }

  const StartScreen = ({ onStart }: StartScreenProps) => {
    const handleStart = () => {
        onStart();
      };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        {/* App Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Circuit Trainer
          </h1>
          <p className="text-gray-400">
            Starte dein Training
          </p>
        </div>

        {/* Start Button */}
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors"
          onClick={handleStart}
        >
          Zu den Trainings
        </button>
      </div>
    </div>
  );
};

export default StartScreen;