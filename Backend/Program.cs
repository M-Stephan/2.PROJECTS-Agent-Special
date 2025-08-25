using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Services
ServiceConfigurator.ConfigureDbAndIdentity(builder.Services, builder.Configuration);
builder.Services.AddControllers();
ServiceConfigurator.ConfigureSwagger(builder.Services);
ServiceConfigurator.ConfigureScalar(builder.Services);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware Scalar (après Swagger)
app.UseScalar();

// Auth & routing
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
