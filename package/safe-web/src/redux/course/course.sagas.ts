import { takeLatest, put, all, call } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { CourseActionTypes } from "./course.types";
import { constantsUrls } from "../../helpers/constants";
import * as Api from "../../api/index";
import {
    fetchCoursesListFailure,
    fetchCoursesListSuccess,
    fetchCourseFailure,
    fetchCourseSuccess,
    fetchCourseStatsFailure,
    fetchCourseStatsSuccess,
    fetchPlayerCourseFailure,
    fetchPlayerCourseSuccess,
    sendAnswerFailure,
    sendAnswerSuccess,
} from "./course.actions";
import type { ICourse, IPlayerCourse, ICourseStats, ISendAnswerPayload, ICourseListItem } from "../../types/course";

const fetchCoursesListStart = createAction(CourseActionTypes.FETCH_COURSES_LIST_START);
const fetchCourseStart = createAction<string>(CourseActionTypes.FETCH_COURSE_START);
const fetchCourseStatsStart = createAction(CourseActionTypes.FETCH_COURSE_STATS_START);
const fetchPlayerCourseStart = createAction<string>(CourseActionTypes.FETCH_PLAYER_COURSE_START);
const sendAnswerStart = createAction<ISendAnswerPayload>(CourseActionTypes.SEND_ANSWER_START);

function* fetchCoursesList() {
    try {
        const coursesList: ICourseListItem[] = yield call(Api.getData, constantsUrls.Course.getAll);
        yield put(fetchCoursesListSuccess(coursesList));
    } catch (error) {
        // @ts-ignore
        yield put(fetchCoursesListFailure(error?.message || error?.name));
    }
}

function* fetchCourse({ payload }: { payload: string }) {
    try {
        const course: ICourse = yield call(Api.getData, constantsUrls.Course.get(payload));
        yield put(fetchCourseSuccess(course));
    } catch (error) {
        // @ts-ignore
        yield put(fetchCourseFailure(error?.message || error?.name));
    }
}

function* fetchCourseStats() {
    try {
        const stats: ICourseStats[] = yield call(Api.getData, constantsUrls.Course.getPlayerStats);
        yield put(fetchCourseStatsSuccess(stats));
    } catch (error) {
        // @ts-ignore
        yield put(fetchCourseStatsFailure(error?.message || error?.name));
    }
}

function* fetchPlayerCourse({ payload }: { payload: string }) {
    try {
        const playerCourse: IPlayerCourse = yield call(Api.getData, constantsUrls.Course.getPlayerCourse(payload));
        yield put(fetchPlayerCourseSuccess(playerCourse));
    } catch (error) {
        // @ts-ignore
        yield put(fetchPlayerCourseFailure(error?.message || error?.name));
    }
}

function* sendAnswer({ payload }: { payload: ISendAnswerPayload }) {
    try {
        const { courseId, ...body } = payload;
        const result: IPlayerCourse = yield call(
            Api.sendData,
            constantsUrls.Course.sendAnswer(courseId),
            body,
            "POST"
        );
        yield put(sendAnswerSuccess(result));
    } catch (error) {
        // @ts-ignore
        yield put(sendAnswerFailure(error?.message || error?.name));
    }
}

function* onFetchCoursesListStart(): Generator {
    yield takeLatest(fetchCoursesListStart, fetchCoursesList);
}

function* onFetchCourseStart(): Generator {
    yield (takeLatest as any)(fetchCourseStart, fetchCourse);
}

function* onFetchCourseStatsStart(): Generator {
    yield takeLatest(fetchCourseStatsStart, fetchCourseStats);
}

function* onFetchPlayerCourseStart(): Generator {
    yield (takeLatest as any)(fetchPlayerCourseStart, fetchPlayerCourse);
}

function* onSendAnswerStart(): Generator {
    yield (takeLatest as any)(sendAnswerStart, sendAnswer);
}

export function* courseSagas() {
    yield all([
        call(onFetchCoursesListStart),
        call(onFetchCourseStart),
        call(onFetchCourseStatsStart),
        call(onFetchPlayerCourseStart),
        call(onSendAnswerStart),
    ]);
}
