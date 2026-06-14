import { configureStore } from "@reduxjs/toolkit";
import { rememberReducer, rememberEnhancer } from "redux-remember";
import createSagaMiddleware from "@redux-saga/core";
import { createLogger } from "redux-logger";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const rememberedKeysLocalStorage = ["user"];
const rememberedKeysSessionStorage = ["materials"];
const logger = createLogger({
	collapsed: true,
	diff: true,
});

export const store = configureStore({
    reducer: rememberReducer(rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(
            sagaMiddleware,
            ...(process.env.NODE_ENV === "development" ? [logger] : []),
        ),
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(
            rememberEnhancer(window.localStorage, rememberedKeysLocalStorage),
            rememberEnhancer(window.sessionStorage, rememberedKeysSessionStorage)
        ),
    devTools: process.env.NODE_ENV === "development",
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export default store;