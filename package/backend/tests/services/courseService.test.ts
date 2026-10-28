import { describe, it, expect, vi } from 'vitest';
import { DB } from '../../src/services/courseService';

describe('services/courseService.ts', () => {
    it('should export initialized DB connector instance with find and get methods', () => {
        expect(DB).toBeDefined();
        expect(DB.Find).toBeDefined();
        expect(DB.Get).toBeDefined();
    });

    it('should call DB.Get.all to retrieve all courses', async () => {
        const mockCourses = [{ _id: 'c-1', courseNumber: 1 }];
        vi.spyOn(DB.Get, 'all').mockResolvedValue(mockCourses as any);

        const result = await DB.Get.all();
        expect(result).toEqual(mockCourses);
    });
});
