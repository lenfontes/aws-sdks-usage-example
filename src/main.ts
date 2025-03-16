import 'module-alias/register';
import 'reflect-metadata';
import {container} from 'tsyringe';
import {S3Client} from '@aws-sdk/client-s3';
import {
  IPutObjectCommandFactory,
  IFileUploadService,
  IRepository,
} from './interfaces';

import {
  PutObjectCommandFactory,
} from './repository/paramsFactory';

import {FileUploadService} from './services/uploadService';
import {Repository} from './repository/repository';
import {S3Config} from './types/parameterTypes';
import {AWS_DEFAULTS} from './repository/paramFactory/constants';
import {S3ParamFactory} from './repository/paramFactory/S3ParamFactory';

/**
 * Registers the S3 client as a dependency.
 */
container.registerInstance('S3Client', new S3Client({}));

/**
 * Registers the PutObjectCommandFactory as a dependency.
 */
container.register(IPutObjectCommandFactory, {useClass: PutObjectCommandFactory});

/**
 * Registers the FileUploadService as a dependency.
 */
container.register(IFileUploadService, {useClass: FileUploadService});

/**
 * Registers the Repository as a dependency.
 */
container.register(IRepository, {useClass: Repository});

container.register<S3Config>('S3Config', {
  useValue: {
    defaultBucket: process.env.BUCKET_NAME || 'default-bucket',
    region: process.env.AWS_REGION || AWS_DEFAULTS.REGION,
    basePath: process.env.S3_BASE_PATH || '',
  },
});

// Register the S3ParamFactory
container.register('S3ParamFactory', {useClass: S3ParamFactory});

/**
 * Resolves the FileUploadService from the container.
 */
export const fileUploadService: IFileUploadService = container.resolve(IFileUploadService);