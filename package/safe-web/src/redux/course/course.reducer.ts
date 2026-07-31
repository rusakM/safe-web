import type { UnknownAction } from "@reduxjs/toolkit";
import { CourseActionTypes, type ICourseState } from "./course.types";
import type { ICourse, IPlayerCourse, ICourseStats } from "../../types/course";

const INITIAL_STATE: ICourseState = {
    courseStats: null,
    currentCourse: null,
    fetchingCourseError: null,
    fetchingPlayerCourseError: null,
    fetchingStatsError: null,
    isFetchingCourse: false,
    isFetchingPlayerCourse: false,
    isFetchingStats: false,
    isSendingAnswer: false,
    playerCourse: null,
    sendingAnswerError: null,
};

const courseReducer = (state: ICourseState = INITIAL_STATE, action: UnknownAction): ICourseState => {
    switch (action.type) {
        case CourseActionTypes.FETCH_COURSE_START:
            return {
                ...state,
                fetchingCourseError: null,
                isFetchingCourse: true,
            };
        case CourseActionTypes.FETCH_COURSE_SUCCESS:
            return {
                ...state,
                currentCourse: action.payload as ICourse,
                isFetchingCourse: false,
            };
        case CourseActionTypes.FETCH_COURSE_FAILURE:
            return {
                ...state,
                fetchingCourseError: action.payload as string,
                isFetchingCourse: false,
            };

        case CourseActionTypes.FETCH_COURSE_STATS_START:
            return {
                ...state,
                fetchingStatsError: null,
                isFetchingStats: true,
            };
        case CourseActionTypes.FETCH_COURSE_STATS_SUCCESS:
            return {
                ...state,
                courseStats: action.payload as ICourseStats[],
                isFetchingStats: false,
            };
        case CourseActionTypes.FETCH_COURSE_STATS_FAILURE:
            return {
                ...state,
                fetchingStatsError: action.payload as string,
                isFetchingStats: false,
            };

        case CourseActionTypes.FETCH_PLAYER_COURSE_START:
            return {
                ...state,
                fetchingPlayerCourseError: null,
                isFetchingPlayerCourse: true,
            };
        case CourseActionTypes.FETCH_PLAYER_COURSE_SUCCESS:
            return {
                ...state,
                isFetchingPlayerCourse: false,
                playerCourse: action.payload as IPlayerCourse,
            };
        case CourseActionTypes.FETCH_PLAYER_COURSE_FAILURE:
            return {
                ...state,
                fetchingPlayerCourseError: action.payload as string,
                isFetchingPlayerCourse: false,
            };

        case CourseActionTypes.SEND_ANSWER_START:
            return {
                ...state,
                isSendingAnswer: true,
                sendingAnswerError: null,
            };
        case CourseActionTypes.SEND_ANSWER_SUCCESS:
            return {
                ...state,
                isSendingAnswer: false,
                playerCourse: action.payload as IPlayerCourse,
            };
        case CourseActionTypes.SEND_ANSWER_FAILURE:
            return {
                ...state,
                isSendingAnswer: false,
                sendingAnswerError: action.payload as string,
            };

        default:
            return state;
    }
};

export default courseReducer;
