import { describe, it, expect } from 'vitest';
import tolgeeConfig from '../../src/translations/index';

describe('Tolgee Config Index', () => {
    it('should initialize and export configured tolgee instance', () => {
        expect(tolgeeConfig).toBeDefined();
        expect(typeof tolgeeConfig.changeLanguage).toBe('function');
    });
});
