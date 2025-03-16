# Installation Guide

## Prerequisites
- Node.js 14 or later
- TypeScript 4.x
- AWS Account and credentials

## Basic Setup

1. Install the package and its dependencies:
```bash
npm install @aws-sdk/client-s3 tsyringe reflect-metadata
npm install --save-dev @types/node
```

2. Configure TypeScript:
Make sure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

3. Import reflect-metadata:
```typescript
// In your entry file (e.g., main.ts)
import 'reflect-metadata';
```

## AWS Configuration
1. Set up AWS credentials:
```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=your_region
```

2. Or use AWS credentials file:
```ini
# ~/.aws/credentials
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
``` 