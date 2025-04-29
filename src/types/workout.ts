export interface Workout {
  id: number;
  date: string;
  type: string;
  duration: number;
  caloriesBurned: number;
}

export type WorkoutFormData = Omit<Workout, 'id'>;

export interface ApiError {
  message: string;
  statusCode: number;
}