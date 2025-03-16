import {inject, injectable} from 'tsyringe';
import {IFileUploadService, IRepository} from '../interfaces';
import {S3ParamInput, S3OperationResponse} from '../types/parameterTypes';

/**
 * Service for handling file uploads to S3.
 */
@injectable()
export class FileUploadService implements IFileUploadService {
  constructor(@inject(IRepository) private repository: IRepository) {}

  /**
   * Uploads a file to S3.
   *
   * @param fileData The file data to upload
   * @returns A Promise that resolves to the S3OperationResponse
   */
  async uploadFileToS3(fileData: S3ParamInput): Promise<S3OperationResponse> {
    return await this.repository.uploadObject(fileData);
  }
}
