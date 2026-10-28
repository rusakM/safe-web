import { describe, it, expect, vi, beforeEach } from 'vitest';
import setupCourse from '../../src/controllers/course.controller';
import { appRoute } from '../../src/shared/route';
import { courseService, playerCourseService } from '../../src/services';

vi.mock('../../src/services', () => ({
    courseService: {
        DB: {
            Get: {
                all: vi.fn(),
            },
            Find: {
                byId: vi.fn(),
            },
        },
    },
    playerCourseService: {
        DB: {
            Find: {
                byIndex: vi.fn(),
                byMultipleKeys: vi.fn(),
            },
        },
        Helpers: {
            createPlayerCourse: vi.fn(),
            processAnswer: vi.fn(),
        },
        Model: {},
    },
    loggerService: {
        error: vi.fn(),
        info: vi.fn(),
    },
}));

describe('Course Controller', () => {
    let routes: Record<string, Function[]>;
    let mockRouter: any;

    beforeEach(() => {
        vi.clearAllMocks();
        routes = {};
        mockRouter = {
            get: vi.fn((path: string, ...handlers: Function[]) => {
                routes[`GET ${path}`] = handlers;
            }),
            post: vi.fn((path: string, ...handlers: Function[]) => {
                routes[`POST ${path}`] = handlers;
            }),
        };
        setupCourse(mockRouter);
    });

    const createRes = () => {
        const res: any = {};
        res.status = vi.fn().mockReturnValue(res);
        res.json = vi.fn().mockReturnValue(res);
        res.send = vi.fn().mockReturnValue(res);
        return res;
    };

    it('should register all course routes', () => {
        const routeMap = appRoute.getMap().course;
        expect(routes[`GET ${routeMap.getAll}`]).toBeDefined();
        expect(routes[`GET ${routeMap.getPlayerStats}`]).toBeDefined();
        expect(routes[`GET ${routeMap.get}`]).toBeDefined();
        expect(routes[`GET ${routeMap.getPlayerCourse}`]).toBeDefined();
        expect(routes[`POST ${routeMap.sendAnswer}`]).toBeDefined();
    });

    describe('getCourses', () => {
        it('should return mapped course list', async () => {
            const handler = routes[`GET ${appRoute.getMap().course.getAll}`].slice(-1)[0];
            vi.mocked(courseService.DB.Get.all).mockResolvedValueOnce([
                { _id: 'c1', courseNumber: 1, name: 'Module 1' } as any,
                { _id: 'c2', courseNumber: 2, name: 'Module 2' } as any,
            ]);

            const req: any = {};
            const res = createRes();

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { _id: 'c1', courseNumber: 1 },
                { _id: 'c2', courseNumber: 2 },
            ]);
        });

        it('should return empty array if no courses found', async () => {
            const handler = routes[`GET ${appRoute.getMap().course.getAll}`].slice(-1)[0];
            vi.mocked(courseService.DB.Get.all).mockResolvedValueOnce(null as any);

            const req: any = {};
            const res = createRes();

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

    describe('getCourse', () => {
        it('should return 404 when course is not found', async () => {
            const handler = routes[`GET ${appRoute.getMap().course.get}`].slice(-1)[0];
            vi.mocked(courseService.DB.Find.byId).mockResolvedValueOnce(null);

            const req: any = { params: { courseId: 'non-existent' } };
            const res = createRes();

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                name: 'ASSET_NOT_FOUND',
                success: false,
            }));
        });

        it('should return course when found', async () => {
            const handler = routes[`GET ${appRoute.getMap().course.get}`].slice(-1)[0];
            const courseData = { _id: 'c1', courseNumber: 1, name: 'Safe Browsing' };
            vi.mocked(courseService.DB.Find.byId).mockResolvedValueOnce(courseData as any);

            const req: any = { params: { courseId: 'c1' } };
            const res = createRes();

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(courseData);
        });
    });

    describe('getCoursesStats', () => {
        it('should return player course stats', async () => {
            const handler = routes[`GET ${appRoute.getMap().course.getPlayerStats}`].slice(-1)[0];
            vi.mocked(playerCourseService.DB.Find.byIndex).mockResolvedValueOnce([
                { courseId: 'c1', isFinished: true, score: 10 } as any,
                { courseId: 'c2', isFinished: false, score: 5 } as any,
            ]);

            const req: any = { params: { userId: 'u123' } };
            const res = createRes();

            await handler(req, res);

            expect(playerCourseService.DB.Find.byIndex).toHaveBeenCalledWith('playerId', 'u123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { courseId: 'c1', isFinished: true },
                { courseId: 'c2', isFinished: false },
            ]);
        });
    });

    describe('getPlayerCourse', () => {
        it('should return 404 if courseId is missing', async () => {
            const handler = routes[`GET ${appRoute.getMap().course.getPlayerCourse}`].slice(-1)[0];
            const req: any = { params: {} };
            const res = createRes();

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it('should return existing playerCourse if found', async () => {
            const handler = routes[`GET ${appRoute.getMap().course.getPlayerCourse}`].slice(-1)[0];
            const existing = { _id: 'pc1', courseId: 'c1', playerId: 'u1' };
            vi.mocked(playerCourseService.DB.Find.byMultipleKeys).mockResolvedValueOnce([existing as any]);

            const req: any = { params: { courseId: 'c1', userId: 'u1' } };
            const res = createRes();

            await handler(req, res);

            expect(playerCourseService.Helpers.createPlayerCourse).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(existing);
        });

        it('should create and return playerCourse if not found', async () => {
            const handler = routes[`GET ${appRoute.getMap().course.getPlayerCourse}`].slice(-1)[0];
            const created = { _id: 'pc2', courseId: 'c1', playerId: 'u1' };
            vi.mocked(playerCourseService.DB.Find.byMultipleKeys).mockResolvedValueOnce([]);
            vi.mocked(playerCourseService.Helpers.createPlayerCourse).mockResolvedValueOnce(created as any);

            const req: any = { params: { courseId: 'c1', userId: 'u1' } };
            const res = createRes();

            await handler(req, res);

            expect(playerCourseService.Helpers.createPlayerCourse).toHaveBeenCalledWith('c1', 'u1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(created);
        });
    });

    describe('sendAnswer', () => {
        it('should return 404 if courseId is missing', async () => {
            const handler = routes[`POST ${appRoute.getMap().course.sendAnswer}`].slice(-1)[0];
            const req: any = { params: {}, body: {} };
            const res = createRes();

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it('should call processAnswer and return result', async () => {
            const handler = routes[`POST ${appRoute.getMap().course.sendAnswer}`].slice(-1)[0];
            const answerResult = { score: 10, isFinished: false };
            vi.mocked(playerCourseService.Helpers.processAnswer).mockResolvedValueOnce(answerResult as any);

            const req: any = {
                params: { courseId: 'c1', userId: 'u1', requestTime: '2026-01-01T00:00:00Z' },
                body: { moduleId: 0, playerCourseId: 'pc1', questionId: 1, response: 'ans' },
            };
            const res = createRes();

            await handler(req, res);

            expect(playerCourseService.Helpers.processAnswer).toHaveBeenCalledWith({
                courseId: 'c1',
                moduleId: 0,
                playerCourseId: 'pc1',
                playerId: 'u1',
                questionId: 1,
                respondAt: '2026-01-01T00:00:00Z',
                response: 'ans',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(answerResult);
        });
    });
});
