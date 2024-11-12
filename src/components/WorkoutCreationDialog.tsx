// src/components/WorkoutCreationDialog.tsx
import React, { useState } from 'react';
import { PlusCircle, X, Save } from 'lucide-react';
import { Exercise, Workout } from '../types/workout';

interface WorkoutCreationDialogProps {
  onSave: (workout: Workout) => void;
}

interface ExerciseInput {
  id: string;
  name: string;
  duration: string;
  replicas: string;
}

export const WorkoutCreationDialog: React.FC<WorkoutCreationDialogProps> = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<ExerciseInput[]>([
    { id: '1', name: '', duration: '', replicas: '1' }
  ]);

  const handleAddExercise = () => {
    setExercises([...exercises, {
      id: (exercises.length + 1).toString(),
      name: '',
      duration: '',
      replicas: '1'
    }]);
  };

  const handleRemoveExercise = (id: string) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter(ex => ex.id !== id));
    }
  };

  const handleExerciseChange = (id: string, field: keyof ExerciseInput, value: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validExercises: Exercise[] = exercises
      .filter(ex => ex.name && ex.duration && ex.replicas)
      .map(ex => ({
        id: ex.id,
        name: ex.name,
        duration: parseInt(ex.duration, 10),
        replicas: parseInt(ex.replicas, 10)
      }));

    const totalDuration = validExercises.reduce((sum, ex) => 
      sum + (ex.duration * ex.replicas), 0
    );

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName,
      exercises: validExercises,
      totalDuration,
      createdAt: new Date()
    };

    onSave(newWorkout);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setWorkoutName('');
    setExercises([{ id: '1', name: '', duration: '', replicas: '1' }]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                  rounded-full shadow-lg flex items-center justify-center 
                  hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
      >
        <PlusCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Neues Workout erstellen
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Workout Name
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="z.B. HIIT Training"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                       text-gray-900 dark:text-white bg-white dark:bg-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Übungen
            </label>
            {exercises.map((exercise) => (
              <div key={exercise.id} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Übungsname"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                             text-gray-900 dark:text-white bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(exercise.id)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Sek."
                    value={exercise.duration}
                    onChange={(e) => handleExerciseChange(exercise.id, 'duration', e.target.value)}
                    required
                    min="1"
                    className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                             text-gray-900 dark:text-white bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Wdh."
                    value={exercise.replicas}
                    onChange={(e) => handleExerciseChange(exercise.id, 'replicas', e.target.value)}
                    required
                    min="1"
                    className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                             text-gray-900 dark:text-white bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddExercise}
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <PlusCircle size={16} />
            Übung hinzufügen
          </button>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg 
                       hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center gap-2"
            >
              <Save size={16} />
              Workout speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};