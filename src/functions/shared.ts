import { Result, ValidationError } from 'express-validator';

export function validateRequestBody(validationResult: Result<ValidationError>) {
  if (!validationResult.isEmpty()) {
    const error: any = new Error('Invalid data');
    error.statusCode = 400;
    error.data = validationResult.array();
    throw error;
  }
};

export function notFoundError(key: string) {
  const error: any = new Error(`${key} not found`);
  error.statusCode = 404;
  return error;
}

export function insufficientBalanceError() {
  const error: any = new Error('Insufficient balance');
  error.statusCode = 400;
  return error;
}