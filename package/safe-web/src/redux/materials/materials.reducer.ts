import type { UnknownAction } from "@reduxjs/toolkit";
import { MaterialsActionsTypes, type IMaterialsState } from "./materials.types";
import type { IMaterial } from "../../types/material";

const INITIAL_STATE: IMaterialsState = {
    fetchingError: null,
    isFetching: false,
    materials: null,
};

const materialsReducer = (state: IMaterialsState = INITIAL_STATE, action: UnknownAction): IMaterialsState => {
    switch (action.type) {
        case MaterialsActionsTypes.FETCH_MATERIALS_START:
            return {
                ...state,
                fetchingError: null,
                isFetching: true,
            };
        case MaterialsActionsTypes.FETCH_MATERIALS_SUCCESS:
            return {
                ...INITIAL_STATE,
                materials: action.payload as IMaterial[],
            };
        case MaterialsActionsTypes.FETCH_MATERIALS_FAILURE:
            return {
                ...INITIAL_STATE,
                fetchingError: action.payload as string
            };
        default:
            return state;
    }
}

export default materialsReducer;