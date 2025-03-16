# Testing Guide

## Unit Testing with Mocks

### Basic Mock Setup
```typescript
import {setupTestContainer, cleanupTest} from './testUtils';

describe('S3Service', () => {
  const {s3Service, mockS3Client} = setupTestContainer();

  afterEach(() => {
    mockS3Client.reset();
    cleanupTest();
  });

  it('should upload file', async () => {
    // Arrange
    mockS3Client.mockMethod('putObject', {
      $metadata: { httpStatusCode: 200 }
    });

    // Act
    const result = await s3Service.uploadFile({
      file: Buffer.from('test'),
      filename: 'test.txt'
    });

    // Assert
    expect(result.bucket).toBe('test-bucket');
  });
});
```

### Custom Mock Responses
```typescript
// Mock with custom implementation
mockS3Client.mockImplementation('putObject', () => {
  return Promise.resolve({
    ETag: '"123456"',
    VersionId: 'v1'
  });
});
```

## Integration Testing
For integration tests with real AWS services:

```typescript
// Set up real S3 client for integration tests
container.registerInstance('S3Client', new S3Client({
  region: process.env.AWS_REGION
}));
``` 