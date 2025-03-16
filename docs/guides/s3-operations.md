# S3 Operations Guide

## Basic Usage

### File Upload
```typescript
import {S3Service} from './modules/s3';
import {container} from 'tsyringe';

const s3Service = container.resolve(S3Service);

// Upload a file
const result = await s3Service.uploadFile({
  file: Buffer.from('Hello World'),
  filename: 'hello.txt',
  contentType: 'text/plain',
  metadata: {
    owner: 'user123'
  }
});

console.log(`File uploaded: ${result.url}`);
```

### Configuration
```typescript
// Register S3 configuration
container.register<S3Config>('S3Config', {
  useValue: {
    defaultBucket: 'my-bucket',
    region: 'us-east-1',
    basePath: 'uploads/'
  }
});
```

## Advanced Usage

### Custom Parameter Factory
```typescript
@injectable()
class CustomS3ParamFactory extends S3ParamFactory {
  protected generateParams(input: S3ParamInput): PutObjectCommandInput {
    const params = super.generateParams(input);
    // Add custom parameters
    return {
      ...params,
      ACL: 'public-read',
    };
  }
}

// Register custom factory
container.register('S3ParamFactory', {
  useClass: CustomS3ParamFactory
});
``` 