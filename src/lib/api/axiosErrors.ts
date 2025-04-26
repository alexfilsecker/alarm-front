import { AxiosError, type AxiosResponse } from 'axios';
import { type ValidationError } from 'express-validator';

interface NormalError {
	status: number;
	message: string;
	stack?: string;
}

interface CUnknownError extends NormalError {
	type: 'Unknown';
}

interface CError extends NormalError {
	type: 'Error';
}

interface CValidationError extends NormalError {
	type: 'ValidationError';
	validationErrors: ValidationError[];
}

export interface LoginErrors {
	username?: string;
	password?: string;
}

interface CLoginError extends NormalError {
	type: 'LoginError';
	loginErrors: LoginErrors;
}

export interface KnownErrorData {
	error: CUnknownError | CError | CValidationError | CLoginError;
}

interface KnownAxiosError extends AxiosError {
	response: AxiosResponse<KnownErrorData>;
}

const isKnownAxiosError = (error: unknown): error is KnownAxiosError => {
	return (
		error instanceof AxiosError &&
		error.response !== undefined &&
		error.response.data !== undefined &&
		error.response.data.error !== undefined
	);
};

export const validateKnownAxiosError = (error: unknown): KnownAxiosError => {
	if (!isKnownAxiosError(error)) {
		console.error(error);
		throw error;
	}
	return error;
};
