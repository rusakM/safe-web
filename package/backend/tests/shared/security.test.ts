import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { security, emptyBody } from '../../src/shared/security';
import { ConstantsEnv } from '../../src/core/constants';

describe('shared/security.ts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('emptyBody', () => {
        it('should reset request body to an empty object', () => {
            const req = { body: { some: 'data' } } as any;
            const result = emptyBody(req);
            expect(result.body).toEqual({});
        });
    });

    describe('generateSpecificToken & generateGeneralToken', () => {
        it('should generate a valid JWT token signed with secret', () => {
            const payload = { id: 'user-123' };
            const token = security.generateSpecificToken(payload, '1h');
            expect(token).toBeDefined();

            const decoded = jwt.verify(token, ConstantsEnv.Main.JWT_SECRET) as any;
            expect(decoded.id).toBe('user-123');
        });

        it('should generate general token', () => {
            const token = security.generateGeneralToken();
            expect(token).toBeDefined();
            const decoded = jwt.verify(token, ConstantsEnv.Main.JWT_SECRET);
            expect(decoded).toBeDefined();
        });
    });

    describe('validateParams', () => {
        it('should call next() when params with *Id have valid MongoDB ObjectIds', () => {
            const validId = new Types.ObjectId().toString();
            const req = { params: { courseId: validId, otherParam: 'test' } } as any;
            const res = {} as any;
            const next = vi.fn();

            security.validateParams(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should throw VALIDATION_ERROR when param with *Id is invalid ObjectId', () => {
            const req = { params: { courseId: 'invalid-id' } } as any;
            const res = {} as any;
            const next = vi.fn();

            expect(() => security.validateParams(req, res, next)).toThrow();
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('validateRequest', () => {
        it('should call next() when valid Bearer token is provided', () => {
            const token = security.generateSpecificToken({ id: 'user-123' }, '1h');
            const req = {
                headers: { authorization: `Bearer ${token}` },
            } as any;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;
            const next = vi.fn();

            security.validateRequest(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
            expect(res.status).not.toHaveBeenCalled();
        });

        it('should respond with 401 when Authorization header is missing', () => {
            const req = { headers: {} } as any;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;
            const next = vi.fn();

            security.validateRequest(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Not authenticated.' }));
        });

        it('should respond with 401 when authentication type is not Bearer', () => {
            const req = {
                headers: { authorization: 'Basic xyz' },
            } as any;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;
            const next = vi.fn();

            security.validateRequest(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Incorrect authentication type.' }));
        });
    });

    describe('validateAuthenticatedRequest', () => {
        it('should extract userId into req.params and call next()', () => {
            const token = security.generateSpecificToken({ id: 'user-456' }, '1h');
            const req = {
                headers: { authorization: `Bearer ${token}` },
                params: {},
            } as any;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;
            const next = vi.fn();

            security.validateAuthenticatedRequest(req, res, next);
            expect(req.params.userId).toBe('user-456');
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should return 401 when token is invalid', () => {
            const req = {
                headers: { authorization: 'Bearer invalid.token.jwt' },
                params: {},
            } as any;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;
            const next = vi.fn();

            security.validateAuthenticatedRequest(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('validateRefreshRequest', () => {
        it('should accept expired token when validating refresh request (ignoreExpiration)', () => {
            // Token expired in the past
            const secret = ConstantsEnv.Main.JWT_SECRET;
            const expiredToken = jwt.sign({ id: 'user-refresh' }, secret, { expiresIn: -10 });

            const req = {
                headers: { authorization: `Bearer ${expiredToken}` },
                params: {},
            } as any;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as any;
            const next = vi.fn();

            security.validateRefreshRequest(req, res, next);
            expect(req.params.userId).toBe('user-refresh');
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});
