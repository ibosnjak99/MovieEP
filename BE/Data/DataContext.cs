using Microsoft.EntityFrameworkCore;
using MoviesApi130.Models;

namespace MoviesApi130.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
