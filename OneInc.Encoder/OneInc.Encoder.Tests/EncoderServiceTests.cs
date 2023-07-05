using OneInc.Encoder.Service;

namespace OneInc.Encoder.Tests;

public class EncoderServiceTests
{
    [Fact]
    public void EncodeString_InputString_ReturnsBase64EncodedString()
    {
        // Arrange
        var encoderService = new EncoderService();
        var inputString = "Hello, World!";
        var expectedEncodedString = "SGVsbG8sIFdvcmxkIQ==";

        // Act
        var result = encoderService.EncodeString(inputString);

        // Assert
        Assert.Equal(expectedEncodedString, result);
    }
}