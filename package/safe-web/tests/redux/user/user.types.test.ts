import { describe, it, expect } from 'vitest';
import { UserActionTypes } from '../../../src/redux/user/user.types';

describe('User Action Types', () => {
    it('should have unique action type strings', () => {
        const values = Object.values(UserActionTypes);
        const uniqueValues = new Set(values);
        expect(values.length).toBe(uniqueValues.size);
    });

    it('should define critical authentication action types', () => {
        expect(UserActionTypes.CHECK_EMAIL_START).toBe('CHECK_EMAIL_START');
        expect(UserActionTypes.VERIFY_CODE_START).toBe('VERIFY_CODE_START');
        expect(UserActionTypes.SIGN_OUT).toBe('SIGN_OUT');
        expect(UserActionTypes.SIGN_UP_START).toBe('SIGN_UP_START');
        expect(UserActionTypes.USER_EDIT_START).toBe('USER_EDIT_START');
    });
});
