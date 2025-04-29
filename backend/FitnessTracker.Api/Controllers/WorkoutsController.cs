using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTracker.Api.Data;
using FitnessTracker.Api.Models;

namespace FitnessTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkoutsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WorkoutsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Workout>>> GetWorkouts()
    {
        return await _context.Workouts.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Workout>> GetWorkout(int id)
    {
        var workout = await _context.Workouts.FindAsync(id);

        if (workout == null)
        {
            return NotFound();
        }

        return workout;
    }

    [HttpPost]
    public async Task<ActionResult<Workout>> CreateWorkout(Workout workout)
    {
        _context.Workouts.Add(workout);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetWorkout), new { id = workout.Id }, workout);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateWorkout(int id, Workout workout)
    {
        if (id != workout.Id)
        {
            return BadRequest();
        }

        _context.Entry(workout).State = EntityFrameworkCore.EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!WorkoutExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWorkout(int id)
    {
        var workout = await _context.Workouts.FindAsync(id);
        if (workout == null)
        {
            return NotFound();
        }

        _context.Workouts.Remove(workout);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool WorkoutExists(int id)
    {
        return _context.Workouts.Any(e => e.Id == id);
    }
}