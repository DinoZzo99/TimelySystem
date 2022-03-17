using DomainModels.Models;
using Microsoft.EntityFrameworkCore;

namespace TimelyWebAPI.DatabaseContext
{
    public class TimelyDatabaseContext : DbContext
    {
        public TimelyDatabaseContext(DbContextOptions<TimelyDatabaseContext> options)
            : base(options)
        {

        }
        public DbSet<TimeLog> TimeLogs { get; set; }
    }
}
