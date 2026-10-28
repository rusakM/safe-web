import { describe, it, expect, vi, beforeEach } from 'vitest';
import setupUserAuth from '../../src/controllers/userAuth.controller';
import { appRoute } from '../../src/shared/route';
import { accountService, mailService } from '../../src/services';
import { security } from '../../src/shared/security';
import { ConstantsCountries, ConstantsGlobal } from '../../src/core/constants';

const mockSendVerificationCode = vi.fn();

vi.mock('../../src/services', () => ({
    accountService: {
        DB: {
            findByEmail: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            Find: {
                byId: vi.fn(),
            },
        },
        helpers: {
            generateVerificationCode: vi.fn().mockReturnValue('123456'),
            validateVerificationCode: vi.fn(),
            secureOutput: vi.fn((user) => ({ _id: user._id, email: user.email })),
            deactivateUserAccount: vi.fn(),
        },
        Model: {},
    },
    mailService: {
        Email: vi.fn().mockImplementation(function () {
            return {
                sendVerificationCode: mockSendVerificationCode,
            };
        }),
    },
}));

describe('UserAuth Controller', () => {
    let routes: Record<string, Function[]>;
    let mockRouter: any;

    beforeEach(() => {
        vi.clearAllMocks();
        routes = {};
        mockRouter = {
            post: vi.fn((path: string, ...handlers: Function[]) => {
                routes[`POST ${path}`] = handlers;
            }),
            patch: vi.fn((path: string, ...handlers: Function[]) => {
                routes[`PATCH ${path}`] = handlers;
            }),
            get: vi.fn((path: string, ...handlers: Function[]) => {
                routes[`GET ${path}`] = handlers;
            }),
        };
        setupUserAuth(mockRouter);
    });

    const createRes = () => {
        const res: any = {};
        res.status = vi.fn().mockReturnValue(res);
        res.json = vi.fn().mockReturnValue(res);
        res.send = vi.fn().mockReturnValue(res);
        return res;
    };

    it('should register all user authentication routes', () => {
        const authRoutes = appRoute.getMap().user.auth;
        expect(routes[`POST ${authRoutes.login}`]).toBeDefined();
        expect(routes[`POST ${authRoutes.register}`]).toBeDefined();
        expect(routes[`POST ${authRoutes.confirm}`]).toBeDefined();
        expect(routes[`POST ${authRoutes.refresh}`]).toBeDefined();
        expect(routes[`PATCH ${authRoutes.edit}`]).toBeDefined();
        expect(routes[`GET ${authRoutes.me}`]).toBeDefined();
    });

    describe('register', () => {
        it('should throw error when user already exists and is confirmed', async () => {
            const handler = routes[`POST ${appRoute.getMap().user.auth.register}`].slice(-1)[0];
            vi.mocked(accountService.DB.findByEmail).mockResolvedValueOnce({
                _id: 'u1',
                email: 'test@example.com',
                confirmed: true,
            } as any);

            const req: any = { body: { email: 'test@example.com' }, headers: {} };
            const res = createRes();

            await expect(handler(req, res)).rejects.toThrow();
        });

        it('should create new user and send verification email if user does not exist', async () => {
            const handler = routes[`POST ${appRoute.getMap().user.auth.register}`].slice(-1)[0];
            vi.mocked(accountService.DB.findByEmail).mockResolvedValueOnce(null);
            const createdUser = {
                _id: 'u-new',
                email: 'new@example.com',
                countryCode: ConstantsCountries._Enum.PL,
                userInterfaceLanguage: ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.en,
            };
            vi.mocked(accountService.DB.create).mockResolvedValueOnce(createdUser as any);

            const req: any = {
                body: { email: 'NEW@example.com' },
                headers: { 'user-agent': 'Vitest-Agent' },
            };
            const res = createRes();

            await handler(req, res);

            expect(accountService.DB.create).toHaveBeenCalledWith(expect.objectContaining({
                email: 'new@example.com',
                countryCode: ConstantsCountries._Enum.PL,
            }));
            expect(mockSendVerificationCode).toHaveBeenCalledWith('123456', ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.en, true);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Verification required',
            }));
        });

        it('should update unconfirmed existing user and send email', async () => {
            const handler = routes[`POST ${appRoute.getMap().user.auth.register}`].slice(-1)[0];
            const unconfirmedUser = {
                _id: 'u-unconfirmed',
                email: 'unconfirmed@example.com',
                confirmed: false,
                verificationCodes: [],
            };
            vi.mocked(accountService.DB.findByEmail).mockResolvedValueOnce(unconfirmedUser as any);
            vi.mocked(accountService.DB.update).mockResolvedValueOnce(unconfirmedUser as any);

            const req: any = {
                body: { email: 'unconfirmed@example.com' },
                headers: {},
            };
            const res = createRes();

            await handler(req, res);

            expect(accountService.DB.update).toHaveBeenCalledWith('u-unconfirmed', expect.any(Object));
            expect(mockSendVerificationCode).toHaveBeenCalledWith('123456', undefined, false);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('login', () => {
        it('should throw error when user is not found', async () => {
            const handler = routes[`POST ${appRoute.getMap().user.auth.login}`].slice(-1)[0];
            vi.mocked(accountService.DB.findByEmail).mockResolvedValueOnce(null);

            const req: any = { body: { email: 'unknown@example.com' } };
            const res = createRes();

            await expect(handler(req, res)).rejects.toThrow();
        });

        it('should generate verification code, send email, update user, and respond', async () => {
            const handler = routes[`POST ${appRoute.getMap().user.auth.login}`].slice(-1)[0];
            const existingUser = {
                _id: 'u1',
                email: 'user@example.com',
                userInterfaceLanguage: ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.pl,
            };
            vi.mocked(accountService.DB.findByEmail).mockResolvedValueOnce(existingUser as any);
            vi.mocked(accountService.DB.update).mockResolvedValueOnce(existingUser as any);

            const req: any = { body: { email: 'user@example.com' } };
            const res = createRes();

            await handler(req, res);

            expect(mockSendVerificationCode).toHaveBeenCalledWith('123456', ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.pl, false);
            expect(accountService.DB.update).toHaveBeenCalledWith('u1', expect.any(Object));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Verification required',
            }));
        });
    });

    describe('confirm', () => {
        it('should throw error when user is not found', async () => {
            const handler = routes[`POST ${appRoute.getMap().user.auth.confirm}`].slice(-1)[0];
            vi.mocked(accountService.DB.findByEmail).mockResolvedValueOnce(null);

            const req: any = { body: { email: 'nonexistent@example.com', verificationCode: '123456' }, headers: {} };
            const res = createRes();

            await expect(handler(req, res)).rejects.toThrow();
        });

        it('should validate code, mark confirmed if needed, and return token and user', async () => {
            const handler = routes[`POST ${appRoute.getMap().user.auth.confirm}`].slice(-1)[0];
            const user = { _id: 'u1', email: 'test@example.com', confirmed: false };
            vi.mocked(accountService.DB.findByEmail).mockResolvedValueOnce(user as any);
            vi.mocked(accountService.DB.update).mockResolvedValueOnce({ ...user, confirmed: true } as any);

            const req: any = {
                body: { email: 'test@example.com', verificationCode: '123456' },
                headers: { 'user-agent': 'Vitest-Test' },
            };
            const res = createRes();

            await handler(req, res);

            expect(accountService.helpers.validateVerificationCode).toHaveBeenCalledWith(user, '123456', 'Vitest-Test');
            expect(accountService.DB.update).toHaveBeenCalledWith('u1', { confirmed: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                token: expect.any(String),
                user: expect.objectContaining({ _id: 'u1' }),
            }));
        });
    });

    describe('refreshToken', () => {
        it('should throw error when userId is missing', () => {
            const handler = routes[`POST ${appRoute.getMap().user.auth.refresh}`].slice(-1)[0];
            const req: any = { params: {} };
            const res = createRes();

            expect(() => handler(req, res)).toThrow();
        });

        it('should generate and return a new token when userId is provided', () => {
            const handler = routes[`POST ${appRoute.getMap().user.auth.refresh}`].slice(-1)[0];
            const req: any = { params: { userId: 'u123' } };
            const res = createRes();

            handler(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                token: expect.any(String),
            });
        });
    });

    describe('getCurrentUser', () => {
        it('should throw error when userId is missing', async () => {
            const handler = routes[`GET ${appRoute.getMap().user.auth.me}`].slice(-1)[0];
            const req: any = { params: {} };
            const res = createRes();

            await expect(handler(req, res)).rejects.toThrow();
        });

        it('should throw error when user is not found in DB', async () => {
            const handler = routes[`GET ${appRoute.getMap().user.auth.me}`].slice(-1)[0];
            vi.mocked(accountService.DB.Find.byId).mockResolvedValueOnce(null);

            const req: any = { params: { userId: 'u999' } };
            const res = createRes();

            await expect(handler(req, res)).rejects.toThrow();
        });

        it('should return secured user when found', async () => {
            const handler = routes[`GET ${appRoute.getMap().user.auth.me}`].slice(-1)[0];
            const user = { _id: 'u123', email: 'test@example.com' };
            vi.mocked(accountService.DB.Find.byId).mockResolvedValueOnce(user as any);

            const req: any = { params: { userId: 'u123' } };
            const res = createRes();

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(accountService.helpers.secureOutput(user as any));
        });
    });

    describe('updateAccount', () => {
        it('should throw error if user not found', async () => {
            const handler = routes[`PATCH ${appRoute.getMap().user.auth.edit}`].slice(-1)[0];
            vi.mocked(accountService.DB.Find.byId).mockResolvedValueOnce(null);

            const req: any = { params: { userId: 'u404' }, body: {} };
            const res = createRes();

            await expect(handler(req, res)).rejects.toThrow();
        });

        it('should throw error if email update does not match existing user email', async () => {
            const handler = routes[`PATCH ${appRoute.getMap().user.auth.edit}`].slice(-1)[0];
            vi.mocked(accountService.DB.Find.byId).mockResolvedValueOnce({ _id: 'u1', email: 'orig@test.com' } as any);

            const req: any = { params: { userId: 'u1' }, body: { email: 'diff@test.com' } };
            const res = createRes();

            await expect(handler(req, res)).rejects.toThrow();
        });

        it('should update user and deactivate account if isEnabled is false', async () => {
            const handler = routes[`PATCH ${appRoute.getMap().user.auth.edit}`].slice(-1)[0];
            const user = { _id: 'u1', email: 'test@example.com', isEnabled: true };
            vi.mocked(accountService.DB.Find.byId).mockResolvedValueOnce(user as any);
            vi.mocked(accountService.DB.update).mockResolvedValueOnce({ ...user, isEnabled: false } as any);

            const req: any = { params: { userId: 'u1' }, body: { isEnabled: false } };
            const res = createRes();

            await handler(req, res);

            expect(accountService.DB.update).toHaveBeenCalledWith('u1', { isEnabled: false });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
