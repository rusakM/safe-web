import { describe, it, expect } from 'vitest';
import { UserValidators, validateEditUser } from '../../../src/helpers/validators.ts/user';
import { UserRoleEnum } from '../../../src/types/user';

describe('User Validators', () => {
    it('UserValidators.email should validate email address format', () => {
        expect(UserValidators.email.validate('user@example.com').error).toBeUndefined();
        expect(UserValidators.email.validate('invalid_email').error).toBeDefined();
    });

    it('UserValidators.role should validate role enum', () => {
        expect(UserValidators.role.validate(UserRoleEnum.STUDENT).error).toBeUndefined();
        expect(UserValidators.role.validate(UserRoleEnum.TEACHER).error).toBeUndefined();
        expect(UserValidators.role.validate('INVALID_ROLE').error).toBeDefined();
    });

    it('validateEditUser should return boolean error flags for required fields', () => {
        const validData = {
            countryCode: 'PL',
            firstName: 'Jan',
            lastName: 'Kowalski',
            role: UserRoleEnum.STUDENT,
        };
        const validation = validateEditUser(validData as any);
        expect(validation.countryCode).toBe(false);
        expect(validation.firstName).toBe(false);
        expect(validation.lastName).toBe(false);
        expect(validation.role).toBe(false);

        const invalidData = {
            countryCode: '',
            firstName: '',
            lastName: '',
            role: undefined,
        };
        const invalidValidation = validateEditUser(invalidData as any);
        expect(invalidValidation.countryCode).toBe(true);
        expect(invalidValidation.firstName).toBe(true);
        expect(invalidValidation.lastName).toBe(true);
        expect(invalidValidation.role).toBe(true);
    });
});
