import { describe, it, expect } from 'vitest';
import {
    selectMaterials,
    selectIsFetchingMaterials,
    selectMaterialsFetchingError,
} from '../../../src/redux/materials/materials.selectors';
import type { IStore } from '../../../src/redux/store.types';
import type { IMaterial } from '../../../src/types/material';

describe('Materials Selectors', () => {
    const mockMaterials: IMaterial[] = [{ _id: 'm1', materialNumber: 1 } as any];

    const mockState: Partial<IStore> = {
        materials: {
            materials: mockMaterials,
            isFetching: true,
            fetchingError: 'Some error',
        },
    };

    it('selectMaterials should return materials array', () => {
        expect(selectMaterials(mockState as IStore)).toEqual(mockMaterials);
    });

    it('selectIsFetchingMaterials should return isFetching flag', () => {
        expect(selectIsFetchingMaterials(mockState as IStore)).toBe(true);
    });

    it('selectMaterialsFetchingError should return fetchingError', () => {
        expect(selectMaterialsFetchingError(mockState as IStore)).toBe('Some error');
    });
});
