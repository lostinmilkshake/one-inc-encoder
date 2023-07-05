using OneInc.Encoder.Hubs;
using OneInc.Encoder.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Services.AddScoped<IEncoderService, EncoderService>();

var origins = builder.Configuration.GetValue<string>("AllowedOrigins")?.Split(",");
builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientPermission", policy =>
    {
        if (origins != null)
        {
            policy.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins(origins)
                .AllowCredentials();
        }
    });
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("ClientPermission");

app.MapHub<EncoderHub>("/encoderHub");

app.Run();