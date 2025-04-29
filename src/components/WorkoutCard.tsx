import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import { Workout } from '../types/workout';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (id: number) => void;
}

export function WorkoutCard({ workout, onEdit, onDelete }: WorkoutCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{workout.type}</h3>
          <p className="text-sm text-gray-500">{new Date(workout.date).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(workout)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(workout.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-medium">{workout.duration} minutes</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Calories Burned</p>
          <p className="font-medium">{workout.caloriesBurned} kcal</p>
        </div>
      </div>
    </div>
  );
}