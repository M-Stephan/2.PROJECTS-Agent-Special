using Backend.Data;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Backend.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            // Load .env
            Env.Load();

            var connectionString =
                $"server={Env.GetString("DB_SERVER")};" +
                $"port={Env.GetString("DB_PORT")};" +
                $"database={Env.GetString("DB_NAME")};" +
                $"user={Env.GetString("DB_USER")};" +
                $"password={Env.GetString("DB_PASSWORD")};";

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseMySQL(connectionString);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
