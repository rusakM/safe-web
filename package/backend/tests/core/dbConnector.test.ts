import { describe, it, expect, vi } from 'vitest';
import { DbConnector } from '../../src/core/dbConnector';

describe('core/dbConnector.ts', () => {
    it('should initialize with provided mongoose model and define CRUD methods', () => {
        const mockModel = {
            collection: { name: 'test_collection' },
            create: vi.fn(),
            findById: vi.fn(),
            find: vi.fn(),
            findOne: vi.fn(),
        } as any;

        const connector = new DbConnector<any, any, any>(mockModel);

        expect(connector.create).toBeTypeOf('function');
        expect(connector.update).toBeTypeOf('function');
        expect(connector.delete).toBeTypeOf('function');
        expect(connector.Find).toBeDefined();
        expect(connector.Get).toBeDefined();
    });

    it('should delegate create call to mongoose model', async () => {
        const mockDoc = { _id: '123', name: 'Test' };
        const mockModel = {
            collection: { name: 'test_collection' },
            create: vi.fn().mockResolvedValue(mockDoc),
        } as any;

        const connector = new DbConnector<any, any, any>(mockModel);
        const result = await connector.create({ name: 'Test' } as any);

        expect(mockModel.create).toHaveBeenCalledWith({ name: 'Test' });
        expect(result).toEqual(mockDoc);
    });
});
