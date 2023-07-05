using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.SignalR;
using OneInc.Encoder.Service;

namespace OneInc.Encoder.Hubs;

public class EncoderHub : Hub
{
    private readonly IEncoderService _encoderService;

    public EncoderHub(IEncoderService encoderService)
    {
        _encoderService = encoderService;
    }

    public async IAsyncEnumerable<char> EncodeToBase64(string inputString,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        var encodedString = _encoderService.EncodeString(inputString);
        var random = new Random();
        
        foreach (var character in encodedString)
        {
            cancellationToken.ThrowIfCancellationRequested();
            
            var randomDelay = random.Next(1, 5);
            await Task.Delay(TimeSpan.FromSeconds(randomDelay), cancellationToken);
            
            yield return character;
        }
    }
}