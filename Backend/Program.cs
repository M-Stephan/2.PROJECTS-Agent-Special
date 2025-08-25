using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;
using DotNetEnv;
using Backend.Data;
using Backend.Services;

// Load .env file
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Build connection string from env
string GetConnectionStringFromEnv() =>
    $"server={Env.GetString("DB_SERVER")};" +
    $"port={Env.GetString("DB_PORT")};" +
    $"database={Env.GetString("DB_NAME")};" +
    $"user={Env.GetString("DB_USER")};" +
    $"password={Env.GetString("DB_PASSWORD")};";

builder.Configuration["ConnectionStrings:DefaultConnection"] = GetConnectionStringFromEnv();

// --- Services ---
// DbContext + Identity
ServiceConfigurator.ConfigureDbAndIdentity(builder.Services, builder.Configuration);

// Controllers
builder.Services.AddControllers();

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BackendAPI",
        Version = "v1",
        Description = "Documentation et tests du backend - projet AgentSpecial"
    });

    // Optional JWT auth
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });
});

// Scalar middleware uses Swagger JSON, no AddScalar in services
var app = builder.Build();

// --- Middleware ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Scalar API Reference configured to use Swagger
    app.MapScalarApiReference(options =>
    {
        options.WithOpenApiRoutePattern("/swagger/{documentName}/swagger.json");
        options.AddPreferredSecuritySchemes("Bearer");
        options.AddHttpAuthentication("Bearer", auth =>
        {
            auth.Token = string.Empty; // empty by default
        });
    });
}
else
{
    app.MapScalarApiReference();
}

// Auth & routing
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
