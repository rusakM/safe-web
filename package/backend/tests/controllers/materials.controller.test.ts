import { describe, it, expect, vi, beforeEach } from 'vitest';
import setupMaterials from '../../src/controllers/materials.controller';
import { appRoute } from '../../src/shared/route';
import { materialService } from '../../src/services';

vi.mock('../../src/services', () => ({
    materialService: {
        DB: {
            Get: {
                all: vi.fn(),
            },
        },
    },
}));

describe('Materials Controller', () => {
    let routes: Record<string, Function[]>;
    let mockRouter: any;

    beforeEach(() => {
        vi.clearAllMocks();
        routes = {};
        mockRouter = {
            get: vi.fn((path: string, ...handlers: Function[]) => {
                routes[`GET ${path}`] = handlers;
            }),
        };
        setupMaterials(mockRouter);
    });

    const createRes = () => {
        const res: any = {};
        res.status = vi.fn().mockReturnValue(res);
        res.json = vi.fn().mockReturnValue(res);
        res.send = vi.fn().mockReturnValue(res);
        return res;
    };

    it('should register materials get route', () => {
        const routePath = appRoute.getMap().materials.get;
        expect(routes[`GET ${routePath}`]).toBeDefined();
        expect(routes[`GET ${routePath}`].length).toBeGreaterThan(0);
    });

    it('should return materials when found', async () => {
        const handler = routes[`GET ${appRoute.getMap().materials.get}`].slice(-1)[0];
        const mockData = [{ materialNumber: 1, translation: 'mat_1' }];
        vi.mocked(materialService.DB.Get.all).mockResolvedValueOnce(mockData as any);

        const req: any = {};
        const res = createRes();

        await handler(req, res);

        expect(materialService.DB.Get.all).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should throw ASSET_NOT_FOUND when no materials found', async () => {
        const handler = routes[`GET ${appRoute.getMap().materials.get}`].slice(-1)[0];
        vi.mocked(materialService.DB.Get.all).mockResolvedValueOnce(null as any);

        const req: any = {};
        const res = createRes();

        await expect(handler(req, res)).rejects.toThrow();
    });
});
