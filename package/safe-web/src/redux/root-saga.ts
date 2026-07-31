import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { materialsSagas } from "./materials/materials.sagas";
import { courseSagas } from "./course/course.sagas";

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(materialsSagas),
        call(courseSagas),
    ]);
}
