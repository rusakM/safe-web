import { describe, it, expect } from 'vitest';
import { MaterialsActionsTypes } from '../../../src/redux/materials/materials.types';

describe('Materials Action Types', () => {
    it('should have unique material action types', () => {
        const values = Object.values(MaterialsActionsTypes);
        const uniqueValues = new Set(values);
        expect(values.length).toBe(uniqueValues.size);
    });

    it('should define FETCH_MATERIALS action types', () => {
        expect(MaterialsActionsTypes.FETCH_MATERIALS_START).toBe('FETCH_MATERIALS_START');
        expect(MaterialsActionsTypes.FETCH_MATERIALS_SUCCESS).toBe('FETCH_MATERIALS_SUCCESS');
        expect(MaterialsActionsTypes.FETCH_MATERIALS_FAILURE).toBe('FETCH_MATERIALS_FAILURE');
    });
});
