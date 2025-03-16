export abstract class MockBase<T> {
  protected mockResponses: Map<string, any> = new Map();
  protected mockImplementations: Map<string, Function> = new Map();

  mockMethod(methodName: string, response: any): void {
    this.mockResponses.set(methodName, response);
  }

  mockImplementation(methodName: string, implementation: Function): void {
    this.mockImplementations.set(methodName, implementation);
  }

  protected getMockResponse(methodName: string, defaultValue: any = null): any {
    if (this.mockImplementations.has(methodName)) {
      return this.mockImplementations.get(methodName)();
    }
    return this.mockResponses.get(methodName) || defaultValue;
  }

  reset(): void {
    this.mockResponses.clear();
    this.mockImplementations.clear();
  }
} 