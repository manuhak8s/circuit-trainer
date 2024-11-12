// src/types/workout.ts
export interface Exercise {
    id: string;
    name: string;
    duration: number;
    replicas: number;
    restAfter?: number; // Optional pause after this exercise
  }
  
  export interface Workout {
    id: string;
    name: string;
    exercises: Exercise[];
    totalDuration: number;
    createdAt: Date;
    useGlobalRest: boolean;
    globalRestDuration?: number;
  }