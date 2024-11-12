import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const handleStart = () => {
    onStart();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-800">
        {/* App Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Circuit Trainer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Starte dein Training
          </p>
        </div>

        {/* Start Button */}
        <button
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                     hover:bg-gray-800 dark:hover:bg-gray-100 
                     font-bold py-3 px-4 rounded-lg text-lg 
                     transition-all shadow-md"
          onClick={handleStart}
        >
          Zu den Trainings
        </button>
      </div>
    </div>
  );
};

export default StartScreen;