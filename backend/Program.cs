using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionStr = builder.Configuration.GetConnectionString("Mongo");
builder.Services.AddSingleton<IMongoClient, MongoClient>(e => new MongoClient(connectionStr));
builder.Services.AddScoped((serviceProvider) =>
{
    var client = serviceProvider.GetRequiredService<IMongoClient>();
    return client.GetDatabase("TreasureHunter");
});

builder.Services.AddControllers();

builder.Services.AddCors((options) =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowCredentials()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();


app.Run();
