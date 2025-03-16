import {container} from 'tsyringe';
import {MockS3Client} from '../mocks/mockS3Client';
import {S3Service} from '../../s3.service';
import {S3Config} from '../../s3.types';

export const setupTestContainer = () => {
  // Register mocks
  container.registerInstance('S3Client', new MockS3Client());
  
  // Register test config
  container.register<S3Config>('S3Config', {
    useValue: {
      defaultBucket: 'test-bucket',
      region: 'us-east-1',
      basePath: 'test/',
    },
  });

  return {
    s3Service: container.resolve(S3Service),
    mockS3Client: container.resolve('S3Client') as MockS3Client,
  };
};

export const cleanupTest = () => {
  container.clearInstances();
}; 