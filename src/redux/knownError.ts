import type { ValidationError } from 'express-validator';

type NormalError = {
  status: number;
  message: string;
  stack?: string;
};

export type UnknownError = NormalError & {
  type: 'Unknown';
};

export type CError = NormalError & {
  type: 'Error';
};

type CValidationError = NormalError & {
  type: 'ValidationError';
  validationErrors: ValidationError[];
};

export type AuthErrorIn = 'username' | 'password';

type CAuthError = NormalError & {
  type: 'AuthError';
  errorIn: AuthErrorIn;
};

export type KnownError = UnknownError | CError | CValidationError | CAuthError;
