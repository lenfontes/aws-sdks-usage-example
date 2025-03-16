import {inject, injectable} from 'tsyringe';
import {S3Client} from '@aws-sdk/client-s3';
import {S3ParamInput, S3OperationResponse} from '../types/parameterTypes';
import {IS3ParamFactory} from '../interfaces';
import {ValidationError} from '../errors';
import {PutObjectCommand} from '@aws-sdk/client-s3';

@injectable()
export class Repository {
  constructor(
    @inject('S3Client') private s3Client: S3Client,
    @inject('S3ParamFactory') private s3ParamFactory: IS3ParamFactory,
  ) {}

  /**
   * Uploads an object to S3.
   *
   * @param {S3ParamInput} input - The upload parameters
   * @returns {Promise<S3OperationResponse>} - A Promise that resolves to the upload result
   * @throws {ValidationError} If the input parameters are invalid
   */
  async uploadObject(input: S3ParamInput): Promise<S3OperationResponse> {
    try {
      // Generate AWS SDK parameters using the factory
      const params = this.s3ParamFactory.create(input);
      
      // Upload to S3
      console.info(`Uploading file ${input.filename} to S3...`);
      const result = await this.s3Client.send(new PutObjectCommand(params));
      
      // Generate response
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
