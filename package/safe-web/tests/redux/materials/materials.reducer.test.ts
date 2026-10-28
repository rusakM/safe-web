import { describe, it, expect } from 'vitest';
import materialsReducer from '../../../src/redux/materials/materials.reducer';
import { MaterialsActionsTypes, type IMaterialsState } from '../../../src/redux/materials/materials.types';
import type { IMaterial } from '../../../src/types/material';

describe('Materials Reducer', () => {
    const initialState: IMaterialsState = {
        fetchingError: null,
        isFetching: false,
        materials: null,
    };

    it('should return initial state for unknown action', () => {
        expect(materialsReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
    });

    it('should handle FETCH_MATERIALS_START', () => {
        const state = materialsReducer(initialState, {
            type: MaterialsActionsTypes.FETCH_MATERIALS_START,
        });
        expect(state.isFetching).toBe(true);
        expect(state.fetchingError).toBeNull();
    });

    it('should handle FETCH_MATERIALS_SUCCESS', () => {
        const mockMaterials: IMaterial[] = [{ _id: 'm1', materialNumber: 1 } as any];
        const state = materialsReducer(
            { ...initialState, isFetching: true },
            {
                type: MaterialsActionsTypes.FETCH_MATERIALS_SUCCESS,
                payload: mockMaterials,
            }
        );
        expect(state.isFetching).toBe(false);
        expect(state.materials).toEqual(mockMaterials);
    });

    it('should handle FETCH_MATERIALS_FAILURE', () => {
        const state = materialsReducer(
            { ...initialState, isFetching: true },
            {
                type: MaterialsActionsTypes.FETCH_MATERIALS_FAILURE,
                payload: 'Failed to fetch',
            }
        );
        expect(state.isFetching).toBe(false);
        expect(state.fetchingError).toBe('Failed to fetch');
    });
});
