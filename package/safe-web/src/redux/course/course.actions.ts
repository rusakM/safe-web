import { CourseActionTypes } from "./course.types";
import type { ICourse, IPlayerCourse, ICourseStats, ISendAnswerPayload } from "../../types/course";

export const fetchCourseStart = (courseId: string) => ({
    type: CourseActionTypes.FETCH_COURSE_START,
    payload: courseId,
});

export const fetchCourseSuccess = (payload: ICourse) => ({
    type: CourseActionTypes.FETCH_COURSE_SUCCESS,
    payload,
});

export const fetchCourseFailure = (error: string) => ({
    type: CourseActionTypes.FETCH_COURSE_FAILURE,
    payload: error,
});

export const fetchCourseStatsStart = () => ({
    type: CourseActionTypes.FETCH_COURSE_STATS_START,
});

export const fetchCourseStatsSuccess = (payload: ICourseStats[]) => ({
    type: CourseActionTypes.FETCH_COURSE_STATS_SUCCESS,
    payload,
});

export const fetchCourseStatsFailure = (error: string) => ({
    type: CourseActionTypes.FETCH_COURSE_STATS_FAILURE,
    payload: error,
});

export const fetchPlayerCourseStart = (courseId: string) => ({
    type: CourseActionTypes.FETCH_PLAYER_COURSE_START,
    payload: courseId,
});

export const fetchPlayerCourseSuccess = (payload: IPlayerCourse) => ({
    type: CourseActionTypes.FETCH_PLAYER_COURSE_SUCCESS,
    payload,
});

export const fetchPlayerCourseFailure = (error: string) => ({
    type: CourseActionTypes.FETCH_PLAYER_COURSE_FAILURE,
    payload: error,
});

export const sendAnswerStart = (payload: ISendAnswerPayload) => ({
    type: CourseActionTypes.SEND_ANSWER_START,
    payload,
});

export const sendAnswerSuccess = (payload: IPlayerCourse) => ({
    type: CourseActionTypes.SEND_ANSWER_SUCCESS,
    payload,
});

export const sendAnswerFailure = (error: string) => ({
    type: CourseActionTypes.SEND_ANSWER_FAILURE,
    payload: error,
});
