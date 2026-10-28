import { describe, it, expect, vi } from 'vitest';
import {
    validateLogin,
    validateRegister,
    validateConfirmation,
    editAccount,
} from '../../../src/middlewares/validators/userAuth';

describe('middlewares/validators/userAuth.ts', () => {
    describe('validateLogin', () => {
        it('should call next() when valid email is provided', () => {
            const req = { body: { email: 'test@example.com' } } as any;
            const res = {} as any;
            const next = vi.fn();

            validateLogin(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should throw validation error when email is invalid', () => {
            const req = { body: { email: 'invalid-email' } } as any;
            const res = {} as any;
            const next = vi.fn();

            expect(() => validateLogin(req, res, next)).toThrow();
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('validateRegister', () => {
        it('should call next() when valid registration data is provided', () => {
            const req = {
                body: {
                    email: 'user@example.com',
                    countryCode: 'PL',
                    userInterfaceLanguage: 'pl',
                    cookiesAgreement: true,
                    rodoAgreement: true,
                },
            } as any;
            const res = {} as any;
            const next = vi.fn();

            validateRegister(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should throw when email is missing', () => {
            const req = { body: { countryCode: 'PL' } } as any;
            const res = {} as any;
            const next = vi.fn();

            expect(() => validateRegister(req, res, next)).toThrow();
        });
    });

    describe('validateConfirmation', () => {
        it('should call next() when email and verificationCode are provided', () => {
            const req = {
                body: {
                    email: 'user@example.com',
                    verificationCode: '123456',
                },
            } as any;
            const res = {} as any;
            const next = vi.fn();

            validateConfirmation(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should throw when verificationCode is missing', () => {
            const req = { body: { email: 'user@example.com' } } as any;
            const res = {} as any;
            const next = vi.fn();

            expect(() => validateConfirmation(req, res, next)).toThrow();
        });
    });

    describe('editAccount', () => {
        it('should call next() for optional account fields', () => {
            const req = {
                body: {
                    firstName: 'John',
                    lastName: 'Doe',
                },
            } as any;
            const res = {} as any;
            const next = vi.fn();

            editAccount(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});
