/**
 * Input parameters for S3 operations
 */
export interface S3ParamInput {
  file: Buffer | string;
  filename: string;
  contentType?: string;
  metadata?: Record<string, string>;
  bucket?: string;
  path?: string;
}

/**
 * Common response type for S3 operations
 */
export interface S3OperationResponse {
  url: string;
  key: string;
  bucket: string;
  timestamp: string;
}

/**
 * Configuration options for S3 operations
 */
export interface S3Config {
  defaultBucket: string;
  region: string;
  basePath?: string;
} 