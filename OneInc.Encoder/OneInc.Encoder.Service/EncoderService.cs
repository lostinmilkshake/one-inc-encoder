namespace OneInc.Encoder.Service;

public class EncoderService : IEncoderService
{
    public string EncodeString(string inputString)
    {
        var textInBytes = System.Text.Encoding.UTF8.GetBytes(inputString);
        return Convert.ToBase64String(textInBytes);
    }
}