// src/components/WorkoutExecution/Timer.tsx
import React from 'react';
import { Play, Pause } from 'lucide-react';

interface TimerProps {
  progress: number;
  exerciseName: string;
  timeLeft: number;
  isRunning: boolean;
  onTogglePlayPause: () => void;
}

// src/components/WorkoutExecution/Timer.tsx
export const Timer: React.FC<TimerProps> = ({ 
    progress, 
    exerciseName, 
    timeLeft,
    isRunning,
    onTogglePlayPause
  }) => {
    const radius = 140;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);
  
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
  
    return (
      <div className="relative">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle
            cx="200"
            cy="200"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-red-200 dark:text-red-900"
          />
          
          <circle
            cx="200"
            cy="200"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 200 200)"
            className="text-green-500 dark:text-green-400 transition-all duration-1000"
          />
          
          <text
            x="200"
            y="180"
            textAnchor="middle"
            className="text-3xl font-bold fill-current text-gray-900 dark:text-white"
          >
            {exerciseName}
          </text>
          
          <text
            x="200"
            y="240"
            textAnchor="middle"
            className="text-5xl font-mono font-bold fill-current text-gray-900 dark:text-white"
          >
            {formatTime(timeLeft)}
          </text>
        </svg>
  
        <button
          onClick={onTogglePlayPause}
          className="absolute left-1/2 transform -translate-x-1/2 -bottom-16
                   p-5 rounded-full bg-black dark:bg-white text-white dark:text-black
                   hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors
                   shadow-lg"
        >
          {isRunning ? <Pause size={32} /> : <Play size={32} />}
        </button>
      </div>
    );
  };