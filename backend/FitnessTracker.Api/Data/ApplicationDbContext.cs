using Microsoft.EntityFrameworkCore;
using FitnessTracker.Api.Models;

namespace FitnessTracker.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Workout> Workouts { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Workout>()
            .Property(w => w.Type)
            .IsRequired()
            .HasMaxLength(100);
    }
}