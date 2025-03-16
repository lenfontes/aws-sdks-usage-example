import {MockBase} from './mockBase';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import {injectable} from 'tsyringe';

@injectable()
export class MockS3Client extends MockBase<S3Client> implements Pick<S3Client, 'send'> {
  async send(command: PutObjectCommand): Promise<any> {
    if (command instanceof PutObjectCommand) {
      return this.getMockResponse('putObject', {
        $metadata: {
          httpStatusCode: 200,
        },
      });
    }
    throw new Error(`Unmocked command type: ${command.constructor.name}`);
  }
} 