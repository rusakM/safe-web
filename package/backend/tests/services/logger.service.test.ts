import { describe, it, expect, vi } from 'vitest';
import { Logger } from '../../src/services/logger.service';

describe('services/logger.service.ts', () => {
    it('should format log string with timestamp and service name', () => {
        const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const logger = new Logger('TestService');

        logger.info('Info message', { test: 1 });
        expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringContaining('TestService - Info message'), { test: 1 });

        logger.error('Error message', { err: true });
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('TestService - Error message'), { err: true });

        logger.warn('Warn message');
        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('TestService - Warn message'), undefined);
    });
});
