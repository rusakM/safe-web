import type { IMaterial } from "../../types/material"

export const MaterialsActionsTypes = {
    FETCH_MATERIALS_START: "FETCH_MATERIALS_START",
    FETCH_MATERIALS_SUCCESS: "FETCH_MATERIALS_SUCCESS",
    FETCH_MATERIALS_FAILURE: "FETCH_MATERIALS_FAILURE",
}

export interface IMaterialsState {
    fetchingError: string | null;
    isFetching: boolean;
    materials: IMaterial[] | null;
}