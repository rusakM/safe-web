import { describe, it, expect } from 'vitest';
import type { IAction } from '../../src/redux/store.types';

describe('Store Types', () => {
    it('should validate IAction and IStore interface shapes', () => {
        const action: IAction<string> = {
            type: 'TEST_ACTION',
            payload: 'payload_data',
        };
        expect(action.type).toBe('TEST_ACTION');
        expect(action.payload).toBe('payload_data');
    });
});
