import { describe, it, expect } from 'vitest';
import * as actions from '../../../src/redux/materials/materials.actions';
import { MaterialsActionsTypes } from '../../../src/redux/materials/materials.types';
import type { IMaterial } from '../../../src/types/material';

describe('Materials Actions', () => {
    it('fetchMaterialsStart should build start action', () => {
        expect(actions.fetchMaterialsStart()).toEqual({
            type: MaterialsActionsTypes.FETCH_MATERIALS_START,
        });
    });

    it('fetchMaterialsSuccess should carry materials array payload', () => {
        const mockMaterials: IMaterial[] = [{ _id: 'm1', materialNumber: 1 } as any];
        expect(actions.fetchMaterialsSuccess(mockMaterials)).toEqual({
            type: MaterialsActionsTypes.FETCH_MATERIALS_SUCCESS,
            payload: mockMaterials,
        });
    });

    it('fetchMaterialsFailure should carry error payload', () => {
        const err = new Error('Network error');
        expect(actions.fetchMaterialsFailure(err)).toEqual({
            type: MaterialsActionsTypes.FETCH_MATERIALS_FAILURE,
            payload: err,
        });
    });
});
