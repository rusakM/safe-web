import { describe, it, expect } from 'vitest';
import * as ErrorAdapter from '../../src/core/errorAdapter';

describe('core/errorAdapter.ts', () => {
    describe('ApiError class', () => {
        it('should correctly instantiate ApiError with provided error fields', () => {
            const customError: ErrorAdapter.IError = {
                name: 'TEST_ERROR',
                httpCode: 400,
                message: 'Test error message',
                type: 'Error',
            };

            const err = new ErrorAdapter.ApiError(customError);

            expect(err).toBeInstanceOf(Error);
            expect(err).toBeInstanceOf(ErrorAdapter.ApiError);
            expect(err.name).toBe('TEST_ERROR');
            expect(err.httpCode).toBe(400);
            expect(err.message).toBe('Test error message');
            expect(err.type).toBe('Error');
        });
    });

    describe('Core namespace errors', () => {
        it('should create UNEXPECTED_ERROR with httpCode 500', () => {
            const err = ErrorAdapter.Core.createError(ErrorAdapter.Core.ErrorsEnum.UNEXPECTED_ERROR);
            expect(err.httpCode).toBe(500);
            expect(err.name).toBe('UNEXPECTED_ERROR');
        });

        it('should create VALIDATION_ERROR with httpCode 404 and custom data', () => {
            const err = ErrorAdapter.Core.createError(ErrorAdapter.Core.ErrorsEnum.VALIDATION_ERROR, { field: 'email' });
            expect(err.httpCode).toBe(404);
            expect(err.name).toBe('VALIDATION_ERROR');
            expect(err.data).toEqual({ field: 'email' });
        });
    });

    describe('Course namespace errors', () => {
        it('should create COURSE_NOT_FOUND error with 404 status', () => {
            const err = ErrorAdapter.Course.createError(ErrorAdapter.Course.ErrorsEnum.COURSE_NOT_FOUND);
            expect(err.httpCode).toBe(404);
            expect(err.message).toBe('Game not found');
        });

        it('should create MODULE_NOT_FOUND error with 404 status', () => {
            const err = ErrorAdapter.Course.createError(ErrorAdapter.Course.ErrorsEnum.MODULE_NOT_FOUND);
            expect(err.httpCode).toBe(404);
        });

        it('should create QUESTION_NOT_FOUND error with 404 status', () => {
            const err = ErrorAdapter.Course.createError(ErrorAdapter.Course.ErrorsEnum.QUESTION_NOT_FOUND);
            expect(err.httpCode).toBe(404);
        });
    });

    describe('Global namespace errors', () => {
        it('should create USER_EMAIL_EXIST error with 403 status', () => {
            const err = ErrorAdapter.Global.createError(ErrorAdapter.Global.ErrorsEnum.USER_EMAIL_EXIST, { email: 'test@example.com' });
            expect(err.httpCode).toBe(403);
            expect(err.data).toEqual({ email: 'test@example.com' });
        });

        it('should create ASSET_NOT_FOUND error with 404 status', () => {
            const err = ErrorAdapter.Global.createError(ErrorAdapter.Global.ErrorsEnum.ASSET_NOT_FOUND);
            expect(err.httpCode).toBe(404);
            expect(err.name).toBe('ASSET_NOT_FOUND');
        });

        it('should create USER_WITH_EMAIL_NOT_FOUND error with 404 status', () => {
            const err = ErrorAdapter.Global.createError(ErrorAdapter.Global.ErrorsEnum.USER_WITH_EMAIL_NOT_FOUND);
            expect(err.httpCode).toBe(404);
        });
    });
});
