import { describe, it, expect } from 'vitest';
import {
    selectCoursesList,
    selectCurrentCourse,
    selectCourseStats,
    selectPlayerCourse,
    selectIsFetchingCourse,
    selectIsSendingAnswer,
    selectCourseErrors,
} from '../../../src/redux/course/course.selectors';
import type { IStore } from '../../../src/redux/store.types';

describe('Course Selectors', () => {
    const mockState: Partial<IStore> = {
        course: {
            coursesList: [{ _id: 'c1' }] as any,
            currentCourse: { _id: 'c1', name: 'Course 1' } as any,
            courseStats: [{ courseId: 'c1', isFinished: true }] as any,
            playerCourse: { _id: 'pc1', score: 10 } as any,
            isFetchingCourse: true,
            isFetchingCoursesList: false,
            isFetchingPlayerCourse: false,
            isFetchingStats: false,
            isSendingAnswer: true,
            fetchingCourseError: 'Course err',
            fetchingPlayerCourseError: null,
            fetchingStatsError: null,
            fetchingCoursesListError: null,
            sendingAnswerError: null,
        },
    };

    it('should select coursesList and currentCourse', () => {
        expect(selectCoursesList(mockState as IStore)).toHaveLength(1);
        expect(selectCurrentCourse(mockState as IStore)?._id).toBe('c1');
    });

    it('should select playerCourse and stats', () => {
        expect(selectCourseStats(mockState as IStore)?.[0].isFinished).toBe(true);
        expect(selectPlayerCourse(mockState as IStore)?.score).toBe(10);
    });

    it('should select loading flags and errors', () => {
        expect(selectIsFetchingCourse(mockState as IStore)).toBe(true);
        expect(selectIsSendingAnswer(mockState as IStore)).toBe(true);
        expect(selectCourseErrors(mockState as IStore).fetchingCourseError).toBe('Course err');
    });
});
