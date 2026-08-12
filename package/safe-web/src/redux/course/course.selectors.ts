import { createSelector } from "reselect";
import type { ICourseState } from "./course.types";
import type { IStore } from "../store.types";

const selectCourse = (state: IStore): ICourseState => state.course;

export const selectCoursesList = createSelector(
    [selectCourse],
    (course) => course.coursesList
);

export const selectCurrentCourse = createSelector(
    [selectCourse],
    (course) => course.currentCourse
);

export const selectCourseStats = createSelector(
    [selectCourse],
    (course) => course.courseStats
);

export const selectPlayerCourse = createSelector(
    [selectCourse],
    (course) => course.playerCourse
);

export const selectIsFetchingCourse = createSelector(
    [selectCourse],
    (course) => course.isFetchingCourse
);

export const selectIsFetchingStats = createSelector(
    [selectCourse],
    (course) => course.isFetchingStats
);

export const selectIsFetchingPlayerCourse = createSelector(
    [selectCourse],
    (course) => course.isFetchingPlayerCourse
);

export const selectIsSendingAnswer = createSelector(
    [selectCourse],
    (course) => course.isSendingAnswer
);

export const selectCourseErrors = createSelector(
    [selectCourse],
    (course) => ({
        fetchingCourseError: course.fetchingCourseError,
        fetchingPlayerCourseError: course.fetchingPlayerCourseError,
        fetchingStatsError: course.fetchingStatsError,
        sendingAnswerError: course.sendingAnswerError,
    })
);
