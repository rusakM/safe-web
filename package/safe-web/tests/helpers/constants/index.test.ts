import { describe, it, expect } from 'vitest';
import { constantsCourse, constantsTranslations, constantsUrls } from '../../../src/helpers/constants/index';

describe('Constants Root Index', () => {
    it('should export all sub-constant namespaces', () => {
        expect(constantsCourse).toBeDefined();
        expect(constantsTranslations).toBeDefined();
        expect(constantsUrls).toBeDefined();

        expect(constantsTranslations.LocalesEnum).toBeDefined();
        expect(constantsCourse.TYPES_ENUM).toBeDefined();
        expect(constantsUrls.LandingPage).toBeDefined();
    });
});
