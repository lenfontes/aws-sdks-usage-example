# CloudSyringe - AWS SDK Dependency Injection Example

This project demonstrates how to implement a clean, maintainable architecture for AWS SDK interactions using dependency injection with Microsoft's `tsyringe` package. It provides a practical example of decoupling AWS service dependencies for better testability and maintainability.

## Project Overview

The project implements a serverless file upload service using AWS S3, showcasing:
- Dependency injection with tsyringe
- Parameter factory pattern for AWS SDK inputs
- Clean architecture principles
- Type-safe AWS interactions
- Proper error handling and validation

### Key Features

- **Dependency Injection**: Uses tsyringe for IoC container management
- **Parameter Factory Pattern**: Centralizes and standardizes AWS SDK parameter creation
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Error Handling**: Structured error handling with custom error types
- **Input Validation**: Built-in parameter validation
- **Clean Architecture**: Separation of concerns with repository pattern

### Project Structure
src/
├── repository/
│ ├── paramFactory/ # AWS parameter factories
│ │ ├── baseFactory.ts # Base abstract factory
│ │ ├── s3Factory.ts # S3-specific parameter factory
│ │ ├── constants.ts # AWS defaults and constants
│ │ └── index.ts # Factory exports
│ └── repository.ts # S3 repository implementation
├── services/
│ └── uploadService.ts # File upload service
├── types/
│ └── parameterTypes.ts # Type definitions
├── interfaces.ts # Interface definitions
├── handler.ts # Lambda handler
└── main.ts # DI container setup

### Implementation Details

1. **Parameter Factory Pattern**
   - Base abstract factory for AWS parameters
   - Type-safe parameter generation
   - Built-in validation
   - Configurable defaults

2. **Repository Pattern**
   - Decoupled AWS SDK interactions
   - Clean error handling
   - Standardized responses

3. **Service Layer**
   - Business logic separation
   - Dependency injection ready
   - Type-safe operations

4. **Configuration Management**
   - Environment-based configuration
   - Default fallbacks
   - Type-safe config objects

## Usage Example

```typescript
// Upload a file to S3
const input: S3ParamInput = {
file: Buffer.from('content'),
filename: 'example.txt',
contentType: 'text/plain',
metadata: { owner: 'user123' }
};
const result = await fileUploadService.uploadFileToS3(input);
```

## Benefits

1. **Testability**
   - Easy mocking of AWS services
   - Isolated unit testing
   - Dependency injection support

2. **Maintainability**
   - Clear separation of concerns
   - Centralized parameter management
   - Type safety throughout

3. **Extensibility**
   - Easy to add new AWS services
   - Consistent patterns
   - Reusable components

## Getting Started

1. Install dependencies:

```bash:README.md
npm install
```

2. Configure AWS credentials and environment variables:
```bash
export AWS_REGION=us-east-1
export BUCKET_NAME=your-bucket-name
```

3. Deploy with Serverless Framework:
```bash
serverless deploy
```

## Error Handling

The project implements structured error handling:
- Input validation errors (400)
- AWS service errors (500)
- Custom error types for specific scenarios

## Future Improvements

- Add support for more AWS services
- Implement caching layer
- Add comprehensive testing suite
- Add more parameter factories

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## License

ISC

