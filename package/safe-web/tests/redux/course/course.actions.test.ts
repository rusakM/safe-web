import { describe, it, expect } from 'vitest';
import * as actions from '../../../src/redux/course/course.actions';
import { CourseActionTypes } from '../../../src/redux/course/course.types';
import type { ICourse, IPlayerCourse } from '../../../src/types/course';

describe('Course Actions', () => {
    it('fetchCoursesListStart should create FETCH_COURSES_LIST_START action', () => {
        expect(actions.fetchCoursesListStart()).toEqual({
            type: CourseActionTypes.FETCH_COURSES_LIST_START,
        });
    });

    it('fetchCourseStart and fetchCourseSuccess should carry payload', () => {
        expect(actions.fetchCourseStart('course_1')).toEqual({
            type: CourseActionTypes.FETCH_COURSE_START,
            payload: 'course_1',
        });

        const mockCourse: ICourse = { _id: 'c1', courseNumber: 1, name: 'Cyber' } as any;
        expect(actions.fetchCourseSuccess(mockCourse)).toEqual({
            type: CourseActionTypes.FETCH_COURSE_SUCCESS,
            payload: mockCourse,
        });
    });

    it('sendAnswerStart and sendAnswerSuccess should build answer actions', () => {
        const payload = {
            courseId: 'c1',
            moduleId: 1,
            questionId: 1,
            playerCourseId: 'pc1',
            response: 'ans',
        };
        expect(actions.sendAnswerStart(payload)).toEqual({
            type: CourseActionTypes.SEND_ANSWER_START,
            payload,
        });

        const playerCourse: IPlayerCourse = { _id: 'pc1', score: 10 } as any;
        expect(actions.sendAnswerSuccess(playerCourse)).toEqual({
            type: CourseActionTypes.SEND_ANSWER_SUCCESS,
            payload: playerCourse,
        });
    });
});
