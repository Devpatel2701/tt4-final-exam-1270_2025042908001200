import React, { useState, useEffect } from 'react';
import { Plus, Dumbbell } from 'lucide-react';
import { WorkoutCard } from './components/WorkoutCard';
import { WorkoutForm } from './components/WorkoutForm';
import { Workout, WorkoutFormData, ApiError } from './types/workout';
import * as api from './services/api';

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setIsLoading(true);
      const data = await api.getWorkouts();
      setWorkouts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workouts. Please try again later.');
      console.error('Error fetching workouts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWorkout = async (data: WorkoutFormData) => {
    try {
      const newWorkout = await api.createWorkout(data);
      setWorkouts([...workouts, newWorkout]);
      setIsFormOpen(false);
      setError(null);
    } catch (err) {
      setError('Failed to add workout. Please try again.');
      console.error('Error adding workout:', err);
    }
  };

  const handleEditWorkout = async (data: WorkoutFormData) => {
    if (!editingWorkout) return;
    
    try {
      await api.updateWorkout(editingWorkout.id, data);
      const updatedWorkouts = workouts.map((workout) =>
        workout.id === editingWorkout.id ? { ...data, id: workout.id } : workout
      );
      setWorkouts(updatedWorkouts);
      setEditingWorkout(undefined);
      setError(null);
    } catch (err) {
      setError('Failed to update workout. Please try again.');
      console.error('Error updating workout:', err);
    }
  };

  const handleDeleteWorkout = async (id: number) => {
    try {
      await api.deleteWorkout(id);
      setWorkouts(workouts.filter((workout) => workout.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete workout. Please try again.');
      console.error('Error deleting workout:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Fitness Tracker</h1>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Workout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {(isFormOpen || editingWorkout) && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                {editingWorkout ? 'Edit Workout' : 'Add New Workout'}
              </h2>
              <WorkoutForm
                onSubmit={editingWorkout ? handleEditWorkout : handleAddWorkout}
                initialData={editingWorkout}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingWorkout(undefined);
                }}
              />
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onEdit={setEditingWorkout}
                onDelete={handleDeleteWorkout}
              />
            ))}
            {workouts.length === 0 && !isLoading && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No workouts yet. Add your first workout!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;