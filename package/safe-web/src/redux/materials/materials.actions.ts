import { MaterialsActionsTypes } from "./materials.types";
import type { IMaterial } from "../../types/material";

export const fetchMaterialsStart = () => ({
    type: MaterialsActionsTypes.FETCH_MATERIALS_START,
});

export const fetchMaterialsSuccess = (payload: IMaterial[]) => ({
    type: MaterialsActionsTypes.FETCH_MATERIALS_SUCCESS,
    payload
});

export const fetchMaterialsFailure = (error: Error) => ({
    type: MaterialsActionsTypes.FETCH_MATERIALS_FAILURE,
    payload: error
});