import { describe, it, expect, vi } from 'vitest';
import { errorHandler } from '../../src/middlewares/error.handler';
import { ApiError } from '../../src/core/errorAdapter';

describe('middlewares/error.handler.ts', () => {
    it('should format and respond with error status when ApiError is passed', () => {
        const error = new ApiError({
            name: 'NOT_FOUND',
            httpCode: 404,
            message: 'Resource not found',
            type: 'Error',
        });

        const req = { originalUrl: '/api/test' } as any;
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as any;
        const next = vi.fn();

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            route: '/api/test',
            success: false,
            httpCode: 404,
            message: 'Resource not found',
        }));
    });

    it('should fallback to 500 when generic Error is passed', () => {
        const error = new Error('Unexpected crash');
        const req = { originalUrl: '/api/crash' } as any;
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as any;
        const next = vi.fn();

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            route: '/api/crash',
            success: false,
            message: 'Unexpected error',
        }));
    });
});
