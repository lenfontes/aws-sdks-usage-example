import 'module-alias/register';
import 'reflect-metadata';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {fileUploadService} from './main';
import {createSuccessResponse, createErrorResponse} from './response';
import {S3ParamInput} from './types/parameterTypes';
import {ValidationError} from './errors';

/**
 * Lambda handler for file upload to S3.
 *
 * @param event The APIGatewayProxyEvent object containing the request data.
 * @returns A Promise that resolves to an APIGatewayProxyResult object with the response.
 */
export const fileUploadToS3Handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || '{}');
    
    const input: S3ParamInput = {
      file: Buffer.from(body.content || '', 'base64'),
      filename: body.filename,
      contentType: body.contentType,
      metadata: body.metadata,
      path: body.path,
    };

    const result = await fileUploadService.uploadFileToS3(input);
    return createSuccessResponse(200, result);
  } catch (err) {
    console.error(`Error processing file upload to s3: ${err.message}`);
    const statusCode = err instanceof ValidationError ? 400 : 500;
    return createErrorResponse(statusCode, err.message);
  }
};
