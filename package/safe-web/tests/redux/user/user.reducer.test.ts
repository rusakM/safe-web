import { describe, it, expect } from 'vitest';
import userReducer from '../../../src/redux/user/user.reducer';
import { UserActionTypes, type IUserState } from '../../../src/redux/user/user.types';
import type { IUser } from '../../../src/types/user';

describe('User Reducer', () => {
    const initialState: IUserState = {
        currentUser: null,
        isFetching: false,
        signInEmail: '',
        userError: '',
    };

    it('should return initial state for unknown action', () => {
        expect(userReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState);
    });

    it('should handle CHECK_EMAIL_START', () => {
        const state = userReducer(initialState, {
            type: UserActionTypes.CHECK_EMAIL_START,
            payload: 'test@example.com',
        });
        expect(state.isFetching).toBe(true);
        expect(state.signInEmail).toBe('test@example.com');
    });

    it('should handle VERIFY_CODE_SUCCESS and USER_EDIT_SUCCESS', () => {
        const mockUser: IUser = { _id: 'u1', email: 'test@example.com' } as any;
        const state = userReducer(
            { ...initialState, isFetching: true, signInEmail: 'test@example.com' },
            {
                type: UserActionTypes.VERIFY_CODE_SUCCESS,
                payload: mockUser,
            }
        );
        expect(state.currentUser).toEqual(mockUser);
        expect(state.isFetching).toBe(false);
        expect(state.signInEmail).toBe('');
    });

    it('should handle error actions and USER_ERROR_CLEAR', () => {
        const state = userReducer(initialState, {
            type: UserActionTypes.CHECK_EMAIL_FAILURE,
            payload: 'User not found',
        });
        expect(state.userError).toBe('User not found');
        expect(state.isFetching).toBe(false);

        const clearedState = userReducer(state, {
            type: UserActionTypes.USER_ERROR_CLEAR,
        });
        expect(clearedState.userError).toBe('');
    });

    it('should reset to INITIAL_STATE on SIGN_OUT', () => {
        const activeState: IUserState = {
            currentUser: { _id: 'u1', email: 'test@test.com' } as any,
            isFetching: false,
            signInEmail: '',
            userError: '',
        };
        const state = userReducer(activeState, {
            type: UserActionTypes.SIGN_OUT,
        });
        expect(state).toEqual(initialState);
    });
});
