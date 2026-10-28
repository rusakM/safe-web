import { describe, it, expect, vi } from 'vitest';
import { appRoute, appResponse } from '../../src/shared/route';
import { Core as ErrorsCore } from '../../src/core/errorAdapter';

describe('shared/route.ts', () => {
    describe('appRoute.getMap', () => {
        it('should return API route mappings with /api prefix for course and user', () => {
            const routes = appRoute.getMap();
            expect(routes.course.getAll).toBe('/api/course/list');
            expect(routes.course.get).toBe('/api/course/:courseId');
            expect(routes.course.sendAnswer).toBe('/api/course/:courseId/answer');
            expect(routes.user.auth.login).toBe('/api/user/auth/login');
            expect(routes.user.auth.register).toBe('/api/user/auth/register');
            expect(routes.materials.get).toBe('/api/materials');
        });
    });

    describe('appResponse.prepareJsonResponse', () => {
        it('should send 200 and json data when data is present', () => {
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;

            appResponse.prepareJsonResponse(res, { success: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true });
        });

        it('should send 204 when data is null/undefined', () => {
            const res = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn(),
            } as any;

            appResponse.prepareJsonResponse(res, null);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });

        it('should support non200Status override (e.g. 201 Created)', () => {
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;

            appResponse.prepareJsonResponse(res, { created: true }, undefined, 201);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ created: true });
        });
    });

    describe('appResponse.prepareErrorResponse', () => {
        it('should serialize error with its httpCode and success: false', () => {
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;

            const error = ErrorsCore.Errors[ErrorsCore.ErrorsEnum.VALIDATION_ERROR];
            appResponse.prepareErrorResponse(res, error);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                name: 'VALIDATION_ERROR',
                success: false,
            }));
        });

        it('should fallback to UNEXPECTED_ERROR (500) if staticError is null', () => {
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;

            appResponse.prepareErrorResponse(res, null);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                name: 'UNEXPECTED_ERROR',
                success: false,
            }));
        });
    });

    describe('appResponse.prepareInvalidResponse', () => {
        it('should respond with 422 and error body', () => {
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;

            appResponse.prepareInvalidResponse(res, { error: 'Invalid' } as any);
            expect(res.status).toHaveBeenCalledWith(422);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid' });
        });
    });

    describe('appResponse.prepareServerError', () => {
        it('should respond with 500 and text error message', () => {
            const res = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn(),
            } as any;

            appResponse.prepareServerError(res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Unexpected error.');
        });
    });
});
