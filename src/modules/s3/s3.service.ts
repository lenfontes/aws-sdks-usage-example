import {inject, injectable} from 'tsyringe';
import {S3ParamInput, S3OperationResponse} from './s3.types';
import {S3Repository} from './s3.repository';

@injectable()
export class S3Service {
  constructor(@inject('S3Repository') private repository: S3Repository) {}

  async uploadFile(input: S3ParamInput): Promise<S3OperationResponse> {
    return await this.repository.uploadObject(input);
  }
} 