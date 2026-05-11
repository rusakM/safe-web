import { takeLatest, put, all, call } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { UserActionTypes } from "./user.types";
import { constantsUrls } from "../../helpers/constants";
import * as Api from "../../api/index";
import type { IUserConfirm } from "../../api/user.api";

//actions
import {
    checkEmailFailure,
    checkEmailSuccess,
    signUpSuccess,
    signUpFailure,
    verifyCodeSuccess,
    verifyCodeFailure,
    userEditFailure,
    userEditSuccess,
    disableUserSuccess,
    disableUserFailure,
    refreshTokenError,
    refreshTokenSuccess,
    signOut,
} from "./user.actions";
import type { IUser, IRefreshTokenResponse, IUserLogin, IUserEdit } from "../../types/user";

//actionsDefinitions
const checkEmailStart = createAction(UserActionTypes.CHECK_EMAIL_START);
const disableUserStart = createAction(UserActionTypes.DISABLE_USER_START);
const refreshTokenStart = createAction(UserActionTypes.REFRESH_TOKEN_START);
const signUpStart = createAction(UserActionTypes.SIGN_UP_START);
const userEditStart = createAction(UserActionTypes.USER_EDIT_START);
const verifyCodeStart = createAction(UserActionTypes.VERIFY_CODE_START);

function* checkEmail({ payload }: { payload: string }) {
    try {
        yield Api.sendData(
            constantsUrls.User.checkEmail,
            { email: payload },
            "POST"
        );
        yield put(checkEmailSuccess(payload));
    } catch (error) {
        //@ts-ignore
        yield put(checkEmailFailure(error.name));
    }
}

function* disableUser() {
    try {
        yield Api.sendData(constantsUrls.User.edit, { 
            isEnabled: false
        }, 'PATCH');
        yield put(disableUserSuccess());
    } catch (error) {
        //@ts-ignore
        yield put(disableUserFailure(error.name));
    }
}

function* refreshToken() {
    try {
        const res: IUserConfirm = yield call(Api.sendData<IRefreshTokenResponse>, constantsUrls.User.refreshToken, {}, "POST");
        if (res?.token) {
            localStorage.setItem("token", res.token);
            yield put(refreshTokenSuccess(res.token));
        } else {
            yield put(signOut());
        }
    } catch (error) {
        yield put(refreshTokenError(error as Error));
    }
}

function* signUp({ payload } : { payload: IUserLogin }) {
    try {
        yield Api.sendData(constantsUrls.User.signUp, payload, "POST");
        yield put(signUpSuccess(payload.email));
    } catch (error) {
        //@ts-ignore
        yield put(signUpFailure(error.name));
    }
}

function* userEdit({ payload }: { payload: IUserEdit }) {
    try {
        const user: IUser = yield Api.sendData<IUser>(constantsUrls.User.edit, payload, 'PATCH');
        yield put(userEditSuccess(user));
    } catch (error) {
        //@ts-ignore
        yield put(userEditFailure(error.name));
    }
}

function* verifyCode({ payload }: { payload: IUserLogin }) {
    try {
        const {user, token}: IUserConfirm = yield call(Api.sendData, constantsUrls.User.confirm, payload, 'POST');
        localStorage.setItem("token", token);
        yield put(verifyCodeSuccess(user));
    } catch (error) {
        console.log(error);
        //@ts-ignore
        yield put(verifyCodeFailure(error.name));
    }
}

function* onCheckEmailStart(): Generator {
    yield (takeLatest as any)(checkEmailStart, checkEmail);
}

function* onDisableUserStart(): Generator {
    yield takeLatest(disableUserStart, disableUser);
}

function* onRefreshTokenStart(): Generator {
    yield takeLatest(refreshTokenStart, refreshToken);
}

function* onSignUpStart(): Generator {
    yield (takeLatest as any)(signUpStart, signUp);
}

function* onUserEditStart(): Generator {
    yield (takeLatest as any)(userEditStart, userEdit);
}

function* onVerifyCodeStart(): Generator {
    yield (takeLatest as any)(verifyCodeStart, verifyCode);
}

export function* userSagas() {
    yield all([
        call(onCheckEmailStart),
        call(onDisableUserStart),
        call(onRefreshTokenStart),
        call(onSignUpStart),
        call(onUserEditStart),
        call(onVerifyCodeStart),
    ]);
}
