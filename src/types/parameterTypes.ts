/**
 * Input parameters for S3 operations
 */
export interface S3ParamInput {
  /**
   * The file content to upload (can be Buffer or string)
   */
  file: Buffer | string;

  /**
   * The name of the file in S3
   */
  filename: string;

  /**
   * Optional content type of the file
   * @default application/octet-stream
   */
  contentType?: string;

  /**
   * Optional metadata to attach to the S3 object
   */
  metadata?: Record<string, string>;

  /**
   * Optional bucket name. If not provided, will use default bucket from config
   */
  bucket?: string;

  /**
   * Optional folder path within the bucket
   * @example "uploads/images/"
   */
  path?: string;
}

/**
 * Common response type for S3 operations
 */
export interface S3OperationResponse {
  /**
   * The complete URL of the uploaded file
   */
  url: string;

  /**
   * The key (path + filename) of the file in S3
   */
  key: string;

  /**
   * The bucket where the file was uploaded
   */
  bucket: string;

  /**
   * Timestamp of the operation
   */
  timestamp: string;
}

/**
 * Configuration options for S3 operations
 */
export interface S3Config {
  /**
   * Default bucket name
   */
  defaultBucket: string;

  /**
   * Region for S3 operations
   */
  region: string;

  /**
   * Optional base path for all uploads
   */
  basePath?: string;
} 