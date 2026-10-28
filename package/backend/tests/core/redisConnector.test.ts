import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRedisClient = vi.hoisted(() => ({
    connect: vi.fn().mockResolvedValue(undefined),
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
    keys: vi.fn(),
}));

vi.mock('redis', () => ({
    createClient: vi.fn(() => mockRedisClient),
}));

import { RedisConnector } from '../../src/core/redisConnector';

interface TestItem {
    id: string;
    name: string;
    category: string;
}

describe('RedisConnector', () => {
    let connector: RedisConnector<TestItem>;

    beforeEach(() => {
        vi.clearAllMocks();
        connector = new RedisConnector<TestItem>('test_ns', 3600);
    });

    describe('get', () => {
        it('should return parsed object when item exists in redis', async () => {
            const item: TestItem = { id: '1', name: 'Alpha', category: 'A' };
            mockRedisClient.get.mockResolvedValueOnce(JSON.stringify(item));

            const result = await connector.get('1');

            expect(mockRedisClient.get).toHaveBeenCalledWith('test_ns:1');
            expect(result).toEqual(item);
        });

        it('should return null when item does not exist or on error', async () => {
            mockRedisClient.get.mockResolvedValueOnce(null);
            expect(await connector.get('missing')).toBeNull();

            mockRedisClient.get.mockRejectedValueOnce(new Error('Redis timeout'));
            expect(await connector.get('err')).toBeNull();
        });
    });

    describe('save', () => {
        it('should save serialized item with ttl and return data', async () => {
            const item: TestItem = { id: '2', name: 'Beta', category: 'B' };
            mockRedisClient.set.mockResolvedValueOnce('OK');

            const result = await connector.save('2', item, 600);

            expect(mockRedisClient.set).toHaveBeenCalledWith('test_ns:2', JSON.stringify(item), { EX: 600 });
            expect(result).toEqual(item);
        });

        it('should return null if id is missing or on error', async () => {
            const item: TestItem = { id: '', name: 'Empty', category: 'C' };
            expect(await connector.save('', item)).toBeNull();

            mockRedisClient.set.mockRejectedValueOnce(new Error('Write error'));
            expect(await connector.save('err', item)).toBeNull();
        });
    });

    describe('delete', () => {
        it('should return true when redis del removes keys', async () => {
            mockRedisClient.del.mockResolvedValueOnce(1);

            const result = await connector.delete('del_id');

            expect(mockRedisClient.del).toHaveBeenCalledWith('test_ns:del_id');
            expect(result).toBe(true);
        });

        it('should return false when key not found or on error', async () => {
            mockRedisClient.del.mockResolvedValueOnce(0);
            expect(await connector.delete('missing')).toBe(false);

            mockRedisClient.del.mockRejectedValueOnce(new Error('Del error'));
            expect(await connector.delete('err')).toBe(false);
        });
    });

    describe('find', () => {
        it('should return filtered items matching key and value', async () => {
            mockRedisClient.keys.mockResolvedValueOnce(['test_ns:1', 'test_ns:2', 'test_ns:3']);
            mockRedisClient.get
                .mockResolvedValueOnce(JSON.stringify({ id: '1', name: 'One', category: 'CatA' }))
                .mockResolvedValueOnce(JSON.stringify({ id: '2', name: 'Two', category: 'CatB' }))
                .mockResolvedValueOnce(JSON.stringify({ id: '3', name: 'Three', category: 'CatA' }));

            const items = await connector.find('category', 'CatA');

            expect(items).toHaveLength(2);
            expect(items.map((i) => i.id)).toEqual(['1', '3']);
        });

        it('should return empty array on error', async () => {
            mockRedisClient.keys.mockRejectedValueOnce(new Error('Keys failure'));

            const items = await connector.find('category', 'CatA');
            expect(items).toEqual([]);
        });
    });

    describe('getAll', () => {
        it('should return all valid parsed items', async () => {
            mockRedisClient.keys.mockResolvedValueOnce(['test_ns:1', 'test_ns:2']);
            mockRedisClient.get
                .mockResolvedValueOnce(JSON.stringify({ id: '1', name: 'One', category: 'A' }))
                .mockResolvedValueOnce('invalid json');

            const items = await connector.getAll();

            expect(items).toHaveLength(1);
            expect(items[0].id).toBe('1');
        });

        it('should return empty array on error', async () => {
            mockRedisClient.keys.mockRejectedValueOnce(new Error('Keys failure'));
            expect(await connector.getAll()).toEqual([]);
        });
    });
});
