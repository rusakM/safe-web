import { describe, it, expect, vi } from 'vitest';
import { validateSendAnswer } from '../../../src/middlewares/validators/course';

describe('middlewares/validators/course.ts', () => {
    it('should call next() when valid send answer payload is provided', () => {
        const req = {
            body: {
                moduleId: 1,
                questionId: 2,
                response: 'Option A',
            },
        } as any;
        const res = {} as any;
        const next = vi.fn();

        validateSendAnswer(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should allow null or empty string response', () => {
        const req = {
            body: {
                moduleId: 0,
                questionId: 0,
                response: '',
            },
        } as any;
        const res = {} as any;
        const next = vi.fn();

        validateSendAnswer(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should throw validation error when moduleId is missing', () => {
        const req = {
            body: {
                questionId: 1,
            },
        } as any;
        const res = {} as any;
        const next = vi.fn();

        expect(() => validateSendAnswer(req, res, next)).toThrow();
        expect(next).not.toHaveBeenCalled();
    });

    it('should throw validation error when moduleId is negative', () => {
        const req = {
            body: {
                moduleId: -1,
            },
        } as any;
        const res = {} as any;
        const next = vi.fn();

        expect(() => validateSendAnswer(req, res, next)).toThrow();
        expect(next).not.toHaveBeenCalled();
    });
});
