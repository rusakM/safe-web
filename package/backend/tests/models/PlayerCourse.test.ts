import { describe, it, expect } from 'vitest';
import { PlayerCourse } from '../../src/models/PlayerCourse';
import { ConstantsCourse } from '../../src/core/constants';

describe('PlayerCourse Model Schema', () => {
    it('should be defined with the expected paths', () => {
        expect(PlayerCourse).toBeDefined();
        expect(PlayerCourse.schema.path('courseId')).toBeDefined();
        expect(PlayerCourse.schema.path('playerId')).toBeDefined();
        expect(PlayerCourse.schema.path('isFinished')).toBeDefined();
        expect(PlayerCourse.schema.path('score')).toBeDefined();
    });

    it('should require courseId and playerId', () => {
        const invalidDoc = new PlayerCourse({});
        const err = invalidDoc.validateSync();
        expect(err).toBeDefined();
        expect(err?.errors['courseId']).toBeDefined();
        expect(err?.errors['playerId']).toBeDefined();
    });

    it('should have default values for isFinished and score', () => {
        const doc = new PlayerCourse({
            courseId: 'c1',
            playerId: 'u1',
        });
        expect(doc.isFinished).toBe(false);
        expect(doc.score).toBe(0);
        const err = doc.validateSync();
        expect(err).toBeUndefined();
    });

    it('should validate module status enum', () => {
        const validDoc = new PlayerCourse({
            courseId: 'c1',
            playerId: 'u1',
            modulesStats: [
                {
                    module: 1,
                    status: ConstantsCourse.Module.STATUS_ENUM.FINISHED,
                },
            ],
            questionScores: [
                {
                    module: 1,
                    question: 1,
                    points: 1,
                    response: 'ans',
                    correctAnswer: 'ans',
                    respondAt: '2026-01-01T00:00:00Z',
                },
            ],
        });
        const err = validDoc.validateSync();
        expect(err).toBeUndefined();

        const invalidDoc = new PlayerCourse({
            courseId: 'c1',
            playerId: 'u1',
            modulesStats: [
                {
                    module: 1,
                    status: 'INVALID_STATUS' as any,
                },
            ],
        });
        const invalidErr = invalidDoc.validateSync();
        expect(invalidErr?.errors['modulesStats.0.status']).toBeDefined();
    });
});
