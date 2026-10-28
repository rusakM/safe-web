import { describe, it, expect, vi, beforeEach } from 'vitest';
import { helpers, DB } from '../../src/services/account.service';

describe('services/account.service.ts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('generateVerificationCode', () => {
        it('should generate a 6-character code', () => {
            const code = helpers.generateVerificationCode();
            expect(code).toBeDefined();
            expect(code.length).toBe(6);
        });
    });

    describe('secureOutput', () => {
        it('should strip sensitive fields from account', () => {
            const fullUser = {
                _id: 'user-1',
                email: 'test@example.com',
                firstName: 'Jan',
                lastName: 'Kowalski',
                countryCode: 'PL',
                userInterfaceLanguage: 'pl',
                cookiesAgreement: true,
                rodoAgreement: true,
                verificationCodes: [{ value: '123456', createdAt: new Date().toISOString() }],
                failedLoginAttempts: 3,
            } as any;

            const secured = helpers.secureOutput(fullUser);

            expect(secured).toEqual({
                _id: 'user-1',
                email: 'test@example.com',
                firstName: 'Jan',
                lastName: 'Kowalski',
                countryCode: 'PL',
                userInterfaceLanguage: 'pl',
                cookiesAgreement: true,
                rodoAgreement: true,
            });
            expect((secured as any).verificationCodes).toBeUndefined();
            expect((secured as any).failedLoginAttempts).toBeUndefined();
        });
    });

    describe('validateVerificationCode', () => {
        it('should pass and clear codes when code is valid and not expired', async () => {
            const updateSpy = vi.spyOn(DB, 'update').mockResolvedValue({} as any);

            const user = {
                _id: 'user-1',
                failedLoginAttempts: 0,
                verificationCodes: [
                    { value: '123456', createdAt: new Date().toISOString() },
                ],
            } as any;

            await expect(helpers.validateVerificationCode(user, '123456')).resolves.not.toThrow();
            expect(updateSpy).toHaveBeenCalledWith('user-1', expect.objectContaining({
                verificationCodes: [],
                failedLoginAttempts: 0,
            }));
        });

        it('should throw INCORRECT_VERIFICATION_CODE when code does not match', async () => {
            vi.spyOn(DB, 'update').mockResolvedValue({} as any);

            const user = {
                _id: 'user-1',
                failedLoginAttempts: 0,
                verificationCodes: [
                    { value: '123456', createdAt: new Date().toISOString() },
                ],
            } as any;

            await expect(helpers.validateVerificationCode(user, '999999')).rejects.toThrow();
        });

        it('should throw VERIFICATION_CODE_EXPIRED when code is older than expiration limit', async () => {
            vi.spyOn(DB, 'update').mockResolvedValue({} as any);

            // 60 minutes ago
            const pastDate = new Date(Date.now() - 60 * 60 * 1000).toISOString();
            const user = {
                _id: 'user-1',
                failedLoginAttempts: 0,
                verificationCodes: [
                    { value: '123456', createdAt: pastDate },
                ],
            } as any;

            await expect(helpers.validateVerificationCode(user, '123456')).rejects.toThrow();
        });

        it('should throw ACCOUNT_TEMPORARILY_BLOCKED when failedLoginAttempts limit reached', async () => {
            vi.spyOn(DB, 'update').mockResolvedValue({} as any);

            const user = {
                _id: 'user-1',
                failedLoginAttempts: 5, // Limit reached
                latestFailedLoginAt: new Date().toISOString(),
                verificationCodes: [
                    { value: '123456', createdAt: new Date().toISOString() },
                ],
            } as any;

            await expect(helpers.validateVerificationCode(user, '123456')).rejects.toThrow();
        });
    });

    describe('deactivateUserAccount', () => {
        it('should set account to disabled state and clear personal fields', async () => {
            const updateSpy = vi.spyOn(DB, 'update').mockResolvedValue({} as any);

            await helpers.deactivateUserAccount('user-1');

            expect(updateSpy).toHaveBeenCalledWith('user-1', expect.objectContaining({
                isEnabled: false,
                email: '',
                confirmed: false,
            }));
        });
    });
});
