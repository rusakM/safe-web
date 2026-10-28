import { describe, it, expect } from 'vitest';
import courseReducer from '../../../src/redux/course/course.reducer';
import { CourseActionTypes, type ICourseState } from '../../../src/redux/course/course.types';
import type { ICourse, IPlayerCourse } from '../../../src/types/course';

describe('Course Reducer', () => {
    const initialState: ICourseState = {
        coursesList: null,
        courseStats: null,
        currentCourse: null,
        fetchingCoursesListError: null,
        fetchingCourseError: null,
        fetchingPlayerCourseError: null,
        fetchingStatsError: null,
        isFetchingCoursesList: false,
        isFetchingCourse: false,
        isFetchingPlayerCourse: false,
        isFetchingStats: false,
        isSendingAnswer: false,
        playerCourse: null,
        sendingAnswerError: null,
    };

    it('should return initial state for unknown action', () => {
        expect(courseReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
    });

    it('should handle FETCH_COURSES_LIST_START and SUCCESS', () => {
        const loadingState = courseReducer(initialState, {
            type: CourseActionTypes.FETCH_COURSES_LIST_START,
        });
        expect(loadingState.isFetchingCoursesList).toBe(true);

        const list = [{ _id: 'c1', courseNumber: 1 }];
        const successState = courseReducer(loadingState, {
            type: CourseActionTypes.FETCH_COURSES_LIST_SUCCESS,
            payload: list,
        });
        expect(successState.isFetchingCoursesList).toBe(false);
        expect(successState.coursesList).toEqual(list);
    });

    it('should handle FETCH_COURSE_SUCCESS', () => {
        const mockCourse: ICourse = { _id: 'c1', name: 'Safe browsing' } as any;
        const state = courseReducer(initialState, {
            type: CourseActionTypes.FETCH_COURSE_SUCCESS,
            payload: mockCourse,
        });
        expect(state.currentCourse).toEqual(mockCourse);
        expect(state.isFetchingCourse).toBe(false);
    });

    it('should handle SEND_ANSWER_START and SUCCESS', () => {
        const sendingState = courseReducer(initialState, {
            type: CourseActionTypes.SEND_ANSWER_START,
        });
        expect(sendingState.isSendingAnswer).toBe(true);

        const updatedPlayerCourse: IPlayerCourse = { _id: 'pc1', score: 20 } as any;
        const successState = courseReducer(sendingState, {
            type: CourseActionTypes.SEND_ANSWER_SUCCESS,
            payload: updatedPlayerCourse,
        });
        expect(successState.isSendingAnswer).toBe(false);
        expect(successState.playerCourse).toEqual(updatedPlayerCourse);
    });
});
