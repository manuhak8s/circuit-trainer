// src/pages/WorkoutPage.tsx
import React, { useEffect, useState } from 'react';
import { WorkoutCreationDialog } from '../components/WorkoutCreationDialog';
import { Workout } from '../types/workout';
import { Play, Trash2, Clock, RefreshCw } from 'lucide-react';

// Storage helper functions
const saveWorkouts = (workouts: Workout[]) => {
  localStorage.setItem('workouts', JSON.stringify(workouts));
};

const loadWorkouts = (): Workout[] => {
  const saved = localStorage.getItem('workouts');
  if (saved) {
    return JSON.parse(saved).map((workout: any) => ({
      ...workout,
      createdAt: new Date(workout.createdAt)
    }));
  }
  return [];
};

interface WorkoutCardProps {
  workout: Workout;
  onDelete: (id: string) => void;
  onStart: (workout: Workout) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onDelete, onStart }) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {workout.name}
          </h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Clock size={14} className="text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {formatDuration(workout.totalDuration)}
            </span>
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="px-6 py-4 flex-grow">
        <div className="space-y-3">
          {workout.exercises.map((exercise) => (
            <div 
              key={exercise.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <RefreshCw size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {exercise.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{exercise.duration}s</span>
                    <span>•</span>
                    <span>{exercise.replicas} Wiederholungen</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
        <div className="flex gap-3">
          <button
            onClick={() => onStart(workout)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 
                     bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 
                     text-white dark:text-black font-medium rounded-lg 
                     transition-colors shadow-sm"
          >
            <Play size={16} />
            Workout starten
          </button>
          <button
            onClick={() => onDelete(workout.id)}
            className="flex items-center justify-center p-2.5 
                     text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400
                     hover:bg-red-50 dark:hover:bg-red-500/10
                     rounded-lg transition-colors"
            aria-label="Workout löschen"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkoutPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkouts(loadWorkouts());
  }, []);

  const handleSaveWorkout = (newWorkout: Workout) => {
    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);
    saveWorkouts(updatedWorkouts);
  };

  const handleDeleteWorkout = (id: string) => {
    const updatedWorkouts = workouts.filter(w => w.id !== id);
    setWorkouts(updatedWorkouts);
    saveWorkouts(updatedWorkouts);
  };

  const handleStartWorkout = (workout: Workout) => {
    // TODO: Implementiere die Workout-Start-Logik
    console.log('Starting workout:', workout.name);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Meine Workouts
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <WorkoutCard 
            key={workout.id} 
            workout={workout} 
            onDelete={handleDeleteWorkout}
            onStart={handleStartWorkout}
          />
        ))}
      </div>

      {workouts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Noch keine Workouts vorhanden.
            <br />
            Erstelle dein erstes Workout!
          </p>
        </div>
      )}

      <WorkoutCreationDialog onSave={handleSaveWorkout} />
    </div>
  );
};

export default WorkoutPage;