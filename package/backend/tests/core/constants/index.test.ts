import { describe, it, expect } from 'vitest';
import * as constants from '../../../src/core/constants/index';

describe('Constants Root Index', () => {
    it('should export all constants modules', () => {
        expect(constants.ConstantsCountries).toBeDefined();
        expect(constants.ConstantsCourse).toBeDefined();
        expect(constants.ConstantsGlobal).toBeDefined();
        expect(constants.ConstantsEnv).toBeDefined();
    });

    it('should contain expected country codes and interface languages', () => {
        expect(constants.ConstantsCountries._Enum.PL).toBe('PL');
        expect(constants.ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.pl).toBe('pl');
        expect(constants.ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.en).toBe('en');
    });
});
