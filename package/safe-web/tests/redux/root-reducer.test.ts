import { describe, it, expect } from 'vitest';
import rootReducer from '../../src/redux/root-reducer';

describe('Root Reducer', () => {
    it('should combine course, dropdownMenu, materials, and user reducers', () => {
        const state = rootReducer(undefined, { type: '@@INIT' } as any);
        expect(state).toHaveProperty('course');
        expect(state).toHaveProperty('dropdownMenu');
        expect(state).toHaveProperty('materials');
        expect(state).toHaveProperty('user');
    });
});
