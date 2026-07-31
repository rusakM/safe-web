import type { ICourse, IPlayerCourse, ICourseStats } from "../../types/course";

export const CourseActionTypes = {
    FETCH_COURSE_START: "FETCH_COURSE_START",
    FETCH_COURSE_SUCCESS: "FETCH_COURSE_SUCCESS",
    FETCH_COURSE_FAILURE: "FETCH_COURSE_FAILURE",
    FETCH_COURSE_STATS_START: "FETCH_COURSE_STATS_START",
    FETCH_COURSE_STATS_SUCCESS: "FETCH_COURSE_STATS_SUCCESS",
    FETCH_COURSE_STATS_FAILURE: "FETCH_COURSE_STATS_FAILURE",
    FETCH_PLAYER_COURSE_START: "FETCH_PLAYER_COURSE_START",
    FETCH_PLAYER_COURSE_SUCCESS: "FETCH_PLAYER_COURSE_SUCCESS",
    FETCH_PLAYER_COURSE_FAILURE: "FETCH_PLAYER_COURSE_FAILURE",
    SEND_ANSWER_START: "SEND_ANSWER_START",
    SEND_ANSWER_SUCCESS: "SEND_ANSWER_SUCCESS",
    SEND_ANSWER_FAILURE: "SEND_ANSWER_FAILURE",
};

export interface ICourseState {
    courseStats: ICourseStats[] | null;
    currentCourse: ICourse | null;
    fetchingCourseError: string | null;
    fetchingPlayerCourseError: string | null;
    fetchingStatsError: string | null;
    isFetchingCourse: boolean;
    isFetchingPlayerCourse: boolean;
    isFetchingStats: boolean;
    isSendingAnswer: boolean;
    playerCourse: IPlayerCourse | null;
    sendingAnswerError: string | null;
}
