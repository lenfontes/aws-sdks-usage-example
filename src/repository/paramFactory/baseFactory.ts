import {IAwsParamFactory} from '../../interfaces';
import {ValidationError} from '../../errors';

export abstract class BaseParamFactory<TInput, TOutput> implements IAwsParamFactory<TInput, TOutput> {
  /**
   * Creates AWS SDK parameters from simplified input
   * @param input Simplified input parameters
   * @throws {ValidationError} If input validation fails
   */
  create(input: TInput): TOutput {
    this.validateInput(input);
    return this.generateParams(input);
  }

  /**
   * Validates the input parameters
   * @param input Parameters to validate
   */
  protected abstract validateInput(input: TInput): void;

  /**
   * Generates AWS SDK parameters from input
   * @param input Validated input parameters
   */
  protected abstract generateParams(input: TInput): TOutput;
} 