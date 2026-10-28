import { describe, it, expect } from 'vitest';
import { UserRoleEnum } from '../../src/types/user';
import type { IUser, IUserEdit, IUserLogin, IUserRegistration, IRefreshTokenResponse } from '../../src/types/user';

describe('user types and enums', () => {
    it('should have correct UserRoleEnum values', () => {
        expect(UserRoleEnum.STUDENT).toBe('STUDENT');
        expect(UserRoleEnum.TEACHER).toBe('TEACHER');
    });

    it('should validate interface shapes correctly', () => {
        const user: IUser = {
            _id: 'u-1',
            cookiesAgreement: true,
            countryCode: 'PL',
            email: 'test@example.com',
            failedLoginAttempts: 0,
            firstName: 'Jan',
            isEnabled: true,
            lastName: 'Kowalski',
            lastSeenAt: '2026-01-01T00:00:00.000Z',
            role: UserRoleEnum.STUDENT,
            rodoAgreement: true,
            userInterfaceLanguage: 'pl',
        };
        expect(user._id).toBe('u-1');
        expect(user.role).toBe(UserRoleEnum.STUDENT);

        const userEdit: IUserEdit = {
            firstName: 'Piotr',
        };
        expect(userEdit.firstName).toBe('Piotr');

        const userLogin: IUserLogin = {
            email: 'test@example.com',
            verificationCode: '123456',
        };
        expect(userLogin.verificationCode).toBe('123456');

        const registration: IUserRegistration = {
            email: 'test@example.com',
            userInterfaceLanguage: 'pl',
        };
        expect(registration.email).toBe('test@example.com');

        const refreshToken: IRefreshTokenResponse = {
            token: 'jwt-refresh-token',
        };
        expect(refreshToken.token).toBe('jwt-refresh-token');
    });
});
