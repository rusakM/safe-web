import { describe, it, expect, vi } from 'vitest';
import * as fsPromises from 'node:fs/promises';
import { checkExist, read } from '../../src/services/fileService';

vi.mock('node:fs/promises');

describe('services/fileService.ts', () => {
    describe('checkExist', () => {
        it('should return true if access succeeds', async () => {
            vi.mocked(fsPromises.access).mockResolvedValue(undefined);
            const exists = await checkExist('/path/to/file.txt');
            expect(exists).toBe(true);
        });

        it('should return false if access fails', async () => {
            vi.mocked(fsPromises.access).mockRejectedValue(new Error('ENOENT'));
            const exists = await checkExist('/non/existent.txt');
            expect(exists).toBe(false);
        });
    });

    describe('read', () => {
        it('should read file content when file exists', async () => {
            vi.mocked(fsPromises.access).mockResolvedValue(undefined);
            vi.mocked(fsPromises.readFile).mockResolvedValue('file content' as any);

            const content = await read('/path/to/file.txt');
            expect(content).toBe('file content');
        });

        it('should return null when file does not exist', async () => {
            vi.mocked(fsPromises.access).mockRejectedValue(new Error('ENOENT'));

            const content = await read('/path/to/file.txt');
            expect(content).toBeNull();
        });
    });
});
