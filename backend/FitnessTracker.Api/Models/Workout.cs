namespace FitnessTracker.Api.Models;

public class Workout
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Type { get; set; } = string.Empty;
    public int Duration { get; set; }
    public int CaloriesBurned { get; set; }
}