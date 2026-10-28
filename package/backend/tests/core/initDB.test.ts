import { describe, it, expect, vi, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import initDB from '../../src/core/initDB';

describe('initDB', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should format connection string and call mongoose.connect', async () => {
        const connectSpy = vi.spyOn(mongoose, 'connect').mockImplementation((() => Promise.resolve(mongoose)) as any);
        const onceSpy = vi.spyOn(mongoose.connection, 'once').mockImplementation((() => mongoose.connection) as any);
        const onSpy = vi.spyOn(mongoose.connection, 'on').mockImplementation((() => mongoose.connection) as any);

        await initDB();

        expect(connectSpy).toHaveBeenCalled();
        const calledUrl = connectSpy.mock.calls[0][0];
        expect(typeof calledUrl).toBe('string');
        expect(calledUrl).not.toContain('<username>');
        expect(calledUrl).not.toContain('<password>');
        expect(calledUrl).not.toContain('<host>');
        expect(calledUrl).not.toContain('<database>');

        expect(onceSpy).toHaveBeenCalledWith('open', expect.any(Function));
        expect(onSpy).toHaveBeenCalledWith('error', expect.any(Function));
    });
});
