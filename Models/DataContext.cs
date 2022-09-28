using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using DotnetTuesday.Models;

namespace DotnetTuesday.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<User> User { get; set; } = null!;
    }
}