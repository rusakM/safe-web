import { describe, it, expect, vi } from 'vitest';
import { DB } from '../../src/services/material.service';

describe('services/material.service.ts', () => {
    it('should export initialized DB connector instance for Material model', () => {
        expect(DB).toBeDefined();
        expect(DB.Find).toBeDefined();
        expect(DB.Get).toBeDefined();
    });

    it('should call DB.Get.all to retrieve materials', async () => {
        const mockMaterials = [{ _id: 'm-1', materialNumber: 1 }];
        vi.spyOn(DB.Get, 'all').mockResolvedValue(mockMaterials as any);

        const result = await DB.Get.all();
        expect(result).toEqual(mockMaterials);
    });
});
