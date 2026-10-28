import { describe, it, expect } from 'vitest';
import { constantsCourse } from '../../src/helpers/constants';
import type {
    IQuestionMedia,
    IQuestion,
    IModule,
    IBibliography,
    ICourseListItem,
    ICourse,
    IQuestionScore,
    IModuleStats,
    IPlayerCourse,
    ICourseStats,
    ISendAnswerPayload,
} from '../../src/types/course';

describe('course types contracts', () => {
    it('should validate course related interfaces shapes', () => {
        const media: IQuestionMedia = {
            name: 'Image 1',
            url: 'https://example.com/img.png',
            type: constantsCourse.QUESTION_MEDIA_TYPES_ENUM.PHOTO,
        };
        expect(media.type).toBe('PHOTO');

        const question: IQuestion = {
            questionNumber: 1,
            question: 'Sample question?',
            answers: ['A', 'B'],
            correctAnswer: 'A',
            correctAnswerIndex: 0,
            maxPoints: 1,
            media: [media],
            type: constantsCourse.TYPES_ENUM.SINGLE_CHOOSE,
        };
        expect(question.questionNumber).toBe(1);

        const mod: IModule = {
            moduleNumber: 1,
            moduleNameTranslation: 'Mod 1',
            questions: [question],
        };
        expect(mod.questions).toHaveLength(1);

        const bib: IBibliography = {
            title: 'Ref 1',
            url: 'https://safeweb.org',
        };
        expect(bib.title).toBe('Ref 1');

        const courseItem: ICourseListItem = {
            _id: 'c1',
            courseNumber: 1,
        };
        expect(courseItem.courseNumber).toBe(1);

        const course: ICourse = {
            _id: 'c1',
            courseNumber: 1,
            name: 'Cybersecurity 101',
            modules: [mod],
            bibliography: [bib],
        };
        expect(course.name).toBe('Cybersecurity 101');

        const qScore: IQuestionScore = {
            module: 1,
            question: 1,
            points: 1,
            response: 'A',
            correctAnswer: 'A',
            respondAt: '2026-01-01T00:00:00.000Z',
        };
        expect(qScore.points).toBe(1);

        const modStats: IModuleStats = {
            module: 1,
            status: 'FINISHED',
        };
        expect(modStats.status).toBe('FINISHED');

        const playerCourse: IPlayerCourse = {
            _id: 'pc1',
            courseId: 'c1',
            playerId: 'u1',
            isFinished: true,
            score: 10,
            modulesStats: [modStats],
            questionScores: [qScore],
        };
        expect(playerCourse.isFinished).toBe(true);

        const courseStats: ICourseStats = {
            courseId: 'c1',
            isFinished: false,
        };
        expect(courseStats.isFinished).toBe(false);

        const payload: ISendAnswerPayload = {
            courseId: 'c1',
            moduleId: 1,
            questionId: 1,
            response: 'A',
            playerCourseId: 'pc1',
        };
        expect(payload.courseId).toBe('c1');
    });
});
