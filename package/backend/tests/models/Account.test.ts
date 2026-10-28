import { describe, it, expect } from 'vitest';
import { Account, accountValidators } from '../../src/models/Account';
import { ConstantsCountries, ConstantsGlobal } from '../../src/core/constants';

describe('Account Model & Validators', () => {
    describe('accountValidators (Joi)', () => {
        it('should validate email format', () => {
            expect(accountValidators.email.validate('test@example.com').error).toBeUndefined();
            expect(accountValidators.email.validate('invalid-email').error).toBeDefined();
        });

        it('should validate country code enum', () => {
            expect(accountValidators.countryCode.validate(ConstantsCountries._Enum.PL).error).toBeUndefined();
            expect(accountValidators.countryCode.validate(ConstantsCountries._Enum.DE).error).toBeUndefined();
            expect(accountValidators.countryCode.validate('INVALID_COUNTRY').error).toBeDefined();
        });

        it('should validate user interface language enum', () => {
            expect(accountValidators.userInterfaceLanguage.validate(ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.pl).error).toBeUndefined();
            expect(accountValidators.userInterfaceLanguage.validate(ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.en).error).toBeUndefined();
            expect(accountValidators.userInterfaceLanguage.validate('invalid_lang').error).toBeDefined();
        });
    });

    describe('Account Mongoose Model', () => {
        it('should have correct default values', () => {
            const user = new Account({
                email: 'user@test.com',
            });

            expect(user.confirmed).toBe(false);
            expect(user.cookiesAgreement).toBe(false);
            expect(user.rodoAgreement).toBe(false);
            expect(user.isEnabled).toBe(true);
            expect(user.countryCode).toBe(ConstantsCountries._Enum.PL);
            expect(user.userInterfaceLanguage).toBe(ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.en);
        });

        it('should validate a valid account document', () => {
            const user = new Account({
                email: 'valid@example.com',
                firstName: 'Jan',
                lastName: 'Kowalski',
                countryCode: ConstantsCountries._Enum.PL,
                userInterfaceLanguage: ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.pl,
                verificationCodes: [{ createdAt: new Date().toISOString(), value: '123456' }],
            });

            const err = user.validateSync();
            expect(err).toBeUndefined();
        });

        it('should fail validation on invalid email or countryCode', () => {
            const user = new Account({
                email: 'not-an-email',
                countryCode: 'XX_UNKNOWN',
            });

            const err = user.validateSync();
            expect(err).toBeDefined();
            expect(err?.errors['email'] || err?.errors['countryCode']).toBeDefined();
        });
    });
});
