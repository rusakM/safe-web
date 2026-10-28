import { describe, it, expect } from 'vitest';
import { CourseActionTypes } from '../../../src/redux/course/course.types';

describe('Course Action Types', () => {
    it('should have unique course action type strings', () => {
        const values = Object.values(CourseActionTypes);
        const uniqueValues = new Set(values);
        expect(values.length).toBe(uniqueValues.size);
    });

    it('should define course fetch and answer action types', () => {
        expect(CourseActionTypes.FETCH_COURSES_LIST_START).toBe('FETCH_COURSES_LIST_START');
        expect(CourseActionTypes.FETCH_COURSE_START).toBe('FETCH_COURSE_START');
        expect(CourseActionTypes.FETCH_PLAYER_COURSE_START).toBe('FETCH_PLAYER_COURSE_START');
        expect(CourseActionTypes.SEND_ANSWER_START).toBe('SEND_ANSWER_START');
    });
});
