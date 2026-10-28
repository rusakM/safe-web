import { describe, it, expect } from 'vitest';
import { getFlagEmoji } from '../../src/helpers/locales.functions';

describe('Locales Functions', () => {
    it('getFlagEmoji should convert 2-letter country code into flag emoji', () => {
        const plFlag = getFlagEmoji('PL');
        expect(plFlag).toBe('🇵🇱');

        const frFlag = getFlagEmoji('fr');
        expect(frFlag).toBe('🇫🇷');
    });
});
