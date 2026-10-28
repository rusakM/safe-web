import { describe, it, expect } from 'vitest';
import * as actions from '../../../src/redux/user/user.actions';
import { UserActionTypes } from '../../../src/redux/user/user.types';
import type { IUser } from '../../../src/types/user';

describe('User Actions', () => {
    it('checkEmailStart and checkEmailSuccess should build correct actions', () => {
        expect(actions.checkEmailStart('test@example.com')).toEqual({
            type: UserActionTypes.CHECK_EMAIL_START,
            payload: 'test@example.com',
        });
        expect(actions.checkEmailSuccess('test@example.com')).toEqual({
            type: UserActionTypes.CHECK_EMAIL_SUCCESS,
            payload: 'test@example.com',
        });
    });

    it('signOut should create SIGN_OUT action', () => {
        expect(actions.signOut()).toEqual({
            type: UserActionTypes.SIGN_OUT,
        });
    });

    it('setCurrentUser and verifyCodeSuccess should attach user payload', () => {
        const mockUser: IUser = { _id: 'u1', email: 'user@test.com' } as any;
        expect(actions.setCurrentUser(mockUser)).toEqual({
            type: UserActionTypes.SET_CURRENT_USER,
            payload: mockUser,
        });
        expect(actions.verifyCodeSuccess(mockUser)).toEqual({
            type: UserActionTypes.VERIFY_CODE_SUCCESS,
            payload: mockUser,
        });
    });

    it('userEditStart and userEditSuccess should build edit actions', () => {
        const editData = { firstName: 'Jan' };
        expect(actions.userEditStart(editData)).toEqual({
            type: UserActionTypes.USER_EDIT_START,
            payload: editData,
        });
    });
});
