namespace Backend.Services
{
    public static class ServiceConfigurator
    {
        public static void ConfigureDbAndIdentity(IServiceCollection services, IConfiguration config)
        {
            // DbContext MySQL
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    config.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection"))
                )
            );

            // Identity
            services.AddIdentity<IdentityUser, IdentityRole>()
                    .AddEntityFrameworkStores<ApplicationDbContext>()
                    .AddDefaultTokenProviders();
        }

        public static void ConfigureSwagger(IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }

        public static void ConfigureScalar(IServiceCollection services)
        {
            services.AddScalar(options =>
            {
                options.Title = "BackendAPI";
                options.Description = "Documentation et tests du backend - projet `AgentSpecial`";
                options.Version = "v1";
            });
        }
    }
}
