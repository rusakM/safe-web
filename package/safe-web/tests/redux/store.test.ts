import { describe, it, expect } from 'vitest';
import { store } from '../../src/redux/store';

describe('Redux Store', () => {
    it('should initialize configureStore with dispatch and getState', () => {
        expect(store).toBeDefined();
        expect(typeof store.dispatch).toBe('function');
        expect(typeof store.getState).toBe('function');

        const state = store.getState();
        expect(state).toHaveProperty('user');
        expect(state).toHaveProperty('course');
        expect(state).toHaveProperty('materials');
        expect(state).toHaveProperty('dropdownMenu');
    });
});
