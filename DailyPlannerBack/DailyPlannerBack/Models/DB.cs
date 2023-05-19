using Microsoft.EntityFrameworkCore;

namespace DailyPlannerBack.Models
{
    public class DB : DbContext
    {
        private readonly IConfiguration config;
        private readonly ILogger<DB> logger;

        public DbSet<Task> Tasks { get; set; }

        public DB(IConfiguration config, ILogger<DB> logger)
        {
            this.config = config;
            this.logger = logger;

            var dbCreated = Database.EnsureCreated();
            if (this.config["ASPNETCORE_ENVIRONMENT"] == "Development")
            {
                if (dbCreated)
                {
                    this.logger.LogInformation("DB is created success");
                }
                else
                {
                    this.logger.LogInformation("DB has already created");
                }
            }      
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string host = this.config["DB_HOST"];
            string port = this.config["DB_PORT"];
            string database = this.config["DB_DATABASE"];
            string user = this.config["DB_USER"];
            string password = this.config["DB_PASSWORD"];

            if(this.config["ASPNETCORE_ENVIRONMENT"] == "Development")
            {
                this.logger.LogInformation("Connection to DB with options: \r\n" +
                    $"\tHost={host};\r\n" +
                    $"\tPort={port};\r\n" +
                    $"\tDatabase={database};\r\n" +
                    $"\tUsername={user};\r\n" +
                    $"\tPassword={password}\r\n");
            }

            optionsBuilder.UseNpgsql($"Host={host};Port={port};Database={database};Username={user};Password={password}");
        }
    }
}
