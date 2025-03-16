import {setupTestContainer, cleanupTest} from './utils/testUtils';
import {S3ParamInput} from '../s3.types';

describe('S3Service', () => {
  const {s3Service, mockS3Client} = setupTestContainer();

  afterEach(() => {
    mockS3Client.reset();
    cleanupTest();
  });

  it('should upload file successfully', async () => {
    // Arrange
    const input: S3ParamInput = {
      file: Buffer.from('test content'),
      filename: 'test.txt',
      contentType: 'text/plain',
    };

    mockS3Client.mockMethod('putObject', {
      $metadata: { httpStatusCode: 200 },
    });

    // Act
    const result = await s3Service.uploadFile(input);

    // Assert
    expect(result).toMatchObject({
      bucket: 'test-bucket',
      key: 'test/test.txt',
    });
  });

  it('should throw error for invalid input', async () => {
    // Arrange
    const input: S3ParamInput = {
      file: null,
      filename: '',
    };

    // Act & Assert
    await expect(s3Service.uploadFile(input)).rejects.toThrow('File content is required');
  });
}); 