import axios from 'axios';
import { Workout, WorkoutFormData } from '../types/workout';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const response = await api.get<Workout[]>('/workouts');
    return response.data;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};

export const createWorkout = async (workout: WorkoutFormData): Promise<Workout> => {
  const response = await api.post<Workout>('/workouts', workout);
  return response.data;
};

export const updateWorkout = async (id: number, workout: WorkoutFormData): Promise<void> => {
  await api.put(`/workouts/${id}`, { ...workout, id });
};

export const deleteWorkout = async (id: number): Promise<void> => {
  await api.delete(`/workouts/${id}`);
};