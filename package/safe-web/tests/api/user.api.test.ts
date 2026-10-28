import { describe, it, expect } from 'vitest';
import { ERRORS_ENUM, ERRORS_TRANSLATIONS_MAP } from '../../src/api/user.api';

describe('User API Definitions', () => {
    it('ERRORS_ENUM should define all authentication error constants', () => {
        expect(ERRORS_ENUM.ACCOUNT_TEMPORARILY_BLOCKED).toBe('ACCOUNT_TEMPORARILY_BLOCKED');
        expect(ERRORS_ENUM.USER_EMAIL_EXIST).toBe('USER_EMAIL_EXIST');
        expect(ERRORS_ENUM.VERIFICATION_CODE_EXPIRED).toBe('VERIFICATION_CODE_EXPIRED');
        expect(ERRORS_ENUM.USER_WITH_EMAIL_NOT_FOUND).toBe('USER_WITH_EMAIL_NOT_FOUND');
    });

    it('ERRORS_TRANSLATIONS_MAP should map enum keys to lowercase error translation keys', () => {
        expect(ERRORS_TRANSLATIONS_MAP[ERRORS_ENUM.ACCOUNT_TEMPORARILY_BLOCKED])
            .toBe('errors.account_temporarily_blocked');
        expect(ERRORS_TRANSLATIONS_MAP[ERRORS_ENUM.USER_EMAIL_EXIST])
            .toBe('errors.user_email_exist');
    });
});
