import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Helpers, DB } from '../../src/services/playerCourse.service';
import { courseService } from '../../src/services';
import { ConstantsCourse } from '../../src/core/constants';

describe('services/playerCourse.service.ts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Helpers.createPlayerCourse', () => {
        it('should return existing player course if already created', async () => {
            const existing = [{ _id: 'pc-1', courseId: 'c-1', playerId: 'p-1' }];
            vi.spyOn(DB.Find, 'byMultipleKeys').mockResolvedValue(existing as any);

            const result = await Helpers.createPlayerCourse('c-1', 'p-1');
            expect(result).toEqual(existing[0]);
        });

        it('should create new player course if not found', async () => {
            vi.spyOn(DB.Find, 'byMultipleKeys').mockResolvedValue([]);
            vi.spyOn(courseService.DB.Find, 'byId').mockResolvedValue({
                _id: 'c-1',
                modules: [{ moduleNumber: 1 }, { moduleNumber: 2 }],
            } as any);

            const created = {
                _id: 'pc-new',
                courseId: 'c-1',
                playerId: 'p-1',
                score: 0,
                modulesStats: [
                    { module: 1, status: ConstantsCourse.Module.STATUS_ENUM.NOT_STARTED },
                    { module: 2, status: ConstantsCourse.Module.STATUS_ENUM.NOT_STARTED },
                ],
            };
            vi.spyOn(DB, 'create').mockResolvedValue(created as any);

            const result = await Helpers.createPlayerCourse('c-1', 'p-1');
            expect(result).toEqual(created);
        });
    });

    describe('Helpers.processAnswer', () => {
        const mockCourse = {
            _id: 'c-1',
            modules: [
                {
                    moduleNumber: 1,
                    questions: [
                        {
                            type: ConstantsCourse.Question.TYPES_ENUM.SINGLE_CHOOSE,
                            correctAnswer: '5',
                            maxPoints: 1,
                        },
                        {
                            type: ConstantsCourse.Question.TYPES_ENUM.MULTI_CHOOSE,
                            correctAnswer: JSON.stringify([0, 2]),
                            maxPoints: 2,
                        },
                        {
                            type: ConstantsCourse.Question.TYPES_ENUM.FIT_TILES,
                            correctAnswer: JSON.stringify([[0, 1], [2, 3]]),
                            maxPoints: 2,
                        },
                        {
                            type: ConstantsCourse.Question.TYPES_ENUM.CONTENT_TEXT,
                            correctAnswer: null,
                            maxPoints: 0,
                        },
                    ],
                },
            ],
        };

        const mockPlayerCourse = {
            _id: 'pc-1',
            courseId: 'c-1',
            playerId: 'p-1',
            score: 0,
            questionScores: [],
            modulesStats: [{ module: 1, status: ConstantsCourse.Module.STATUS_ENUM.NOT_STARTED }],
        };

        beforeEach(() => {
            vi.spyOn(courseService.DB.Find, 'byId').mockResolvedValue(mockCourse as any);
            vi.spyOn(DB.Find, 'byId').mockResolvedValue(mockPlayerCourse as any);
            vi.spyOn(DB, 'update').mockImplementation(async (id, update) => ({ ...mockPlayerCourse, ...update } as any));
        });

        it('should correctly score a SINGLE_CHOOSE question', async () => {
            const result = await Helpers.processAnswer({
                courseId: 'c-1',
                playerId: 'p-1',
                playerCourseId: 'pc-1',
                moduleId: 0,
                questionId: 0,
                response: '5',
            });

            expect(result.score).toBe(1);
            expect(result.questionScores?.[0].points).toBe(1);
        });

        it('should correctly score a MULTI_CHOOSE question with matching indices', async () => {
            const result = await Helpers.processAnswer({
                courseId: 'c-1',
                playerId: 'p-1',
                playerCourseId: 'pc-1',
                moduleId: 0,
                questionId: 1,
                response: JSON.stringify([0, 2]),
            });

            expect(result.questionScores?.[0].points).toBe(2);
        });

        it('should fail a MULTI_CHOOSE question when choice is wrong', async () => {
            const result = await Helpers.processAnswer({
                courseId: 'c-1',
                playerId: 'p-1',
                playerCourseId: 'pc-1',
                moduleId: 0,
                questionId: 1,
                response: JSON.stringify([0, 1]),
            });

            expect(result.questionScores?.[0].points).toBe(0);
        });

        it('should correctly evaluate FIT_TILES with pairs regardless of ordering', async () => {
            // Correct is [[0, 1], [2, 3]], user sends in reverse [[3, 2], [1, 0]]
            const userResponse = JSON.stringify([[3, 2], [1, 0]]);

            const result = await Helpers.processAnswer({
                courseId: 'c-1',
                playerId: 'p-1',
                playerCourseId: 'pc-1',
                moduleId: 0,
                questionId: 2,
                response: userResponse,
            });

            expect(result.questionScores?.[0].points).toBe(2);
        });

        it('should always consider CONTENT_TEXT as correct with 0 points', async () => {
            const result = await Helpers.processAnswer({
                courseId: 'c-1',
                playerId: 'p-1',
                playerCourseId: 'pc-1',
                moduleId: 0,
                questionId: 3,
                response: '',
            });

            expect(result.questionScores?.[0].points).toBe(0);
        });
    });
});
