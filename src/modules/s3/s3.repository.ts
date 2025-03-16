import {inject, injectable} from 'tsyringe';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import {S3ParamInput, S3OperationResponse} from './s3.types';
import {S3ParamFactory} from './s3.factory';
import {ValidationError} from '../../errors';

@injectable()
export class S3Repository {
  constructor(
    @inject('S3Client') private s3Client: S3Client,
    @inject('S3ParamFactory') private paramFactory: S3ParamFactory,
  ) {}

  async uploadObject(input: S3ParamInput): Promise<S3OperationResponse> {
    try {
      const params = this.paramFactory.create(input);
      console.info(`Uploading file ${input.filename} to S3...`);
      await this.s3Client.send(new PutObjectCommand(params));
      
      return {
        url: `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`,
        key: params.Key,
        bucket: params.Bucket,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      throw new Error(`Error while trying to upload object: ${err.message}`);
    }
  }
} 