import {injectable, inject} from 'tsyringe';
import {PutObjectCommandInput} from '@aws-sdk/client-s3';
import {ValidationError} from '../../errors';
import {S3ParamInput, S3Config} from './s3.types';
import {BaseParamFactory} from '../../repository/paramFactory/baseFactory';

@injectable()
export class S3ParamFactory extends BaseParamFactory<S3ParamInput, PutObjectCommandInput> {
  constructor(@inject('S3Config') private config: S3Config) {
    super();
  }

  protected validateInput(input: S3ParamInput): void {
    if (!input.file) {
      throw new ValidationError('File content is required');
    }
    if (!input.filename) {
      throw new ValidationError('Filename is required');
    }
  }

  protected generateParams(input: S3ParamInput): PutObjectCommandInput {
    const bucket = input.bucket || this.config.defaultBucket;
    const key = this.generateKey(input);

    return {
      Bucket: bucket,
      Key: key,
      Body: input.file,
      ContentType: input.contentType || 'application/octet-stream',
      Metadata: input.metadata,
    };
  }

  private generateKey(input: S3ParamInput): string {
    const basePath = this.config.basePath || '';
    const userPath = input.path || '';
    return `${basePath}${userPath}${input.filename}`.replace(/\/+/g, '/');
  }
} 