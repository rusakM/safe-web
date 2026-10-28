import { describe, it, expect, vi } from 'vitest';
import setup from '../../src/schedulers/index';
import translationsSchedulers from '../../src/schedulers/translations.schedulers';

vi.mock('../../src/schedulers/translations.schedulers', () => ({
    default: vi.fn(),
}));

describe('Schedulers Index', () => {
    it('should call translationsSchedulers setup', () => {
        setup();
        expect(translationsSchedulers).toHaveBeenCalled();
    });
});
