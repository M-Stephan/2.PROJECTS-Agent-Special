using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;
using DotNetEnv;
using Backend.Data;
using Backend.Services;

/// Load .env file
Env.Load(Path.Combine(Directory.GetCurrentDirectory(), ".env"));

Console.WriteLine($"[DEBUG] DB_SERVER = {Env.GetString("DB_SERVER")}");
Console.WriteLine($"[DEBUG] DB_NAME   = {Env.GetString("DB_NAME")}");


var builder = WebApplication.CreateBuilder(args);

/// Build connection string from .env
string GetConnectionStringFromEnv() =>
    $"server={Env.GetString("DB_SERVER")};" +
    $"port={Env.GetString("DB_PORT")};" +
    $"database={Env.GetString("DB_NAME")};" +
    $"user={Env.GetString("DB_USER")};" +
    $"password={Env.GetString("DB_PASSWORD")};";

builder.Configuration["ConnectionStrings:DefaultConnection"] = GetConnectionStringFromEnv();

/// --- Services ---
/// DbContext + Identity
ConfiguratorService.ConfigureDbAndIdentity(builder.Services, builder.Configuration);

/// Controllers
builder.Services.AddControllers();
builder.Services.AddScoped<IUserServices, UserService>();
builder.Services.AddScoped<IPlayerService, PlayerService>();


/// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
ConfiguratorService.ConfigureSwagger(builder.Services);

/// Scalar middleware uses Swagger JSON, no AddScalar in services
var app = builder.Build();

/// --- Middleware ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    /// Scalar API Reference configured to use Swagger
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
