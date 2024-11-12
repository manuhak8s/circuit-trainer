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

  // Berechne die Timing-Informationen für jede Übung
  const exercisesWithTiming = useMemo(() => {
    let currentStartTime = 0;
    return workout.exercises.flatMap(exercise => {
      // Multipliziere mit replicas für jede Wiederholung
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

  // Finde die aktuelle Übung basierend auf der Zeit
  const currentExercise = useMemo(() => {
    return exercisesWithTiming.find(
      exercise => currentTime >= exercise.startTime && currentTime < exercise.endTime
    );
  }, [currentTime, exercisesWithTiming]);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setCurrentTime(prev => {
          const nextTime = prev + 1;
          if (nextTime >= workout.totalDuration) {
            setIsRunning(false);
            return prev;
          }
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, workout.totalDuration]);

  const togglePlayPause = () => {
    setIsRunning(!isRunning);
  };

  if (!currentExercise) return null;

  const exerciseTimeLeft = currentExercise.endTime - currentTime;
  const exerciseProgress = (currentTime - currentExercise.startTime) / currentExercise.duration;

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
          <div className="mb-24"> {/* Mehr Platz für den Play-Button */}
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