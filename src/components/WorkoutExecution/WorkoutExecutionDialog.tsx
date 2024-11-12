// src/components/WorkoutExecution/WorkoutExecutionDialog.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { Workout, Exercise } from '../../types/workout';
import { Timer } from './Timer';

interface WorkoutExecutionDialogProps {
  workout: Workout;
  onClose: () => void;
}

interface ExerciseWithTiming extends Exercise {
  startTime: number;
  endTime: number;
}

export const WorkoutExecutionDialog: React.FC<WorkoutExecutionDialogProps> = ({ workout, onClose }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const exercisesWithTiming = useMemo(() => {
    let currentStartTime = 0;
    return workout.exercises.flatMap(exercise => {
      const repeatedExercises: ExerciseWithTiming[] = [];
      for (let i = 0; i < exercise.replicas; i++) {
        const startTime = currentStartTime;
        const endTime = startTime + exercise.duration;
        repeatedExercises.push({
          ...exercise,
          startTime,
          endTime
        });
        currentStartTime = endTime;
      }
      return repeatedExercises;
    });
  }, [workout]);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setCurrentTime(prev => {
          const nextTime = prev + 1;
          // Prüfe ob das Workout beendet ist
          if (nextTime >= exercisesWithTiming[exercisesWithTiming.length - 1].endTime) {
            setIsRunning(false);
            return exercisesWithTiming[exercisesWithTiming.length - 1].endTime;
          }
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, exercisesWithTiming]);

  const currentExercise = useMemo(() => {
    return exercisesWithTiming.find(
      exercise => currentTime >= exercise.startTime && currentTime < exercise.endTime
    ) || exercisesWithTiming[exercisesWithTiming.length - 1]; // Fallback für das Ende
  }, [currentTime, exercisesWithTiming]);

  const isWorkoutComplete = currentTime >= exercisesWithTiming[exercisesWithTiming.length - 1].endTime;

  if (isWorkoutComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-8 z-50">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-2xl w-full shadow-xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Workout abgeschlossen!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Gut gemacht! Du hast das Workout erfolgreich beendet.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black 
                       rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 
                       transition-colors shadow-lg"
            >
              Zurück zur Übersicht
            </button>
          </div>
        </div>
      </div>
    );
  }

  const exerciseTimeLeft = currentExercise.endTime - currentTime;
  const exerciseProgress = (currentTime - currentExercise.startTime) / currentExercise.duration;

  const togglePlayPause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-8 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-2xl w-full shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {workout.name}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-24">
            <Timer 
              progress={exerciseProgress}
              exerciseName={currentExercise.name}
              timeLeft={exerciseTimeLeft}
              isRunning={isRunning}
              onTogglePlayPause={togglePlayPause}
            />
          </div>

          <div className="w-full mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-base text-gray-600 dark:text-gray-400 text-center">
              Nächste Übung: {
                exercisesWithTiming[exercisesWithTiming.indexOf(currentExercise) + 1]?.name || 
                'Workout beendet'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
