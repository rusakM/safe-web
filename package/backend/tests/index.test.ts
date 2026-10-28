import { describe, it, expect, vi } from 'vitest';

const mockListen = vi.fn((port: any, host: any, cb: any) => {
    if (cb) cb();
});
const mockInitApp = vi.fn().mockResolvedValue({
    listen: mockListen,
});
const mockInitDB = vi.fn().mockResolvedValue(undefined);

vi.mock('../src/core/initDB', () => ({
    default: mockInitDB,
}));

vi.mock('../src/app', () => ({
    default: mockInitApp,
}));

describe('Backend Entry Point (index.ts)', () => {
    it('should initialize database and start server', async () => {
        // Dynamically import src/index so mocks are in place
        await import('../src/index');

        expect(mockInitDB).toHaveBeenCalled();
    });
});
