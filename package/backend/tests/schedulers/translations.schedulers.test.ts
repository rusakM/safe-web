import { describe, it, expect, vi, beforeEach } from 'vitest';
import cron from 'node-cron';
import spawn from 'cross-spawn';
import setupSchedulers from '../../src/schedulers/translations.schedulers';
import * as defs from '../../src/shared/defs';

vi.mock('node-cron', () => ({
    default: {
        schedule: vi.fn(),
    },
}));

vi.mock('cross-spawn', () => ({
    default: {
        sync: vi.fn(),
    },
}));

describe('Translations Schedulers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should NOT schedule cron if test mode is enabled', () => {
        vi.spyOn(defs.Helper, 'isTestModeEnabled').mockReturnValue(true);

        setupSchedulers();

        expect(cron.schedule).not.toHaveBeenCalled();
    });

    it('should schedule cron and execute refreshTranslations script when not in test mode', () => {
        vi.spyOn(defs.Helper, 'isTestModeEnabled').mockReturnValue(false);

        let cronCallback: Function | null = null;
        vi.mocked(cron.schedule).mockImplementation(((expression: string, callback: any) => {
            cronCallback = callback;
            return {} as any;
        }) as any);

        setupSchedulers();

        expect(cron.schedule).toHaveBeenCalledWith('*/30 * * * *', expect.any(Function));

        // Trigger the scheduled callback
        if (cronCallback) {
            (cronCallback as Function)();
            expect(spawn.sync).toHaveBeenCalledWith(
                'bash',
                expect.arrayContaining(['src/scripts/refreshTranslations.sh', '--authkey', '--location']),
                { stdio: 'inherit' }
            );
        }
    });
});
