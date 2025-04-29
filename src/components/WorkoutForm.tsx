import React, { useState, useEffect } from 'react';
import { Workout, WorkoutFormData } from '../types/workout';

interface WorkoutFormProps {
  onSubmit: (data: WorkoutFormData) => void;
  initialData?: Workout;
  onCancel: () => void;
}

export function WorkoutForm({ onSubmit, initialData, onCancel }: WorkoutFormProps) {
  const [formData, setFormData] = useState<WorkoutFormData>({
    date: new Date().toISOString().split('T')[0],
    type: '',
    duration: 0,
    caloriesBurned: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date,
        type: initialData.type,
        duration: initialData.duration,
        caloriesBurned: initialData.caloriesBurned,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Workout Type
        </label>
        <input
          type="text"
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Duration (minutes)
        </label>
        <input
          type="number"
          id="duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="0"
          required
        />
      </div>

      <div>
        <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
          Calories Burned
        </label>
        <input
          type="number"
          id="calories"
          value={formData.caloriesBurned}
          onChange={(e) => setFormData({ ...formData, caloriesBurned: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="0"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? 'Update' : 'Add'} Workout
        </button>
      </div>
    </form>
  );
}