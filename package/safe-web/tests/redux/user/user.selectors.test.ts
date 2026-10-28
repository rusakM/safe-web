import { describe, it, expect } from 'vitest';
import {
    selectCurrentUser,
    selectIsLoadingData,
    selectUserError,
    selectLoginEmail,
} from '../../../src/redux/user/user.selectors';
import type { IStore } from '../../../src/redux/store.types';
import type { IUser } from '../../../src/types/user';

describe('User Selectors', () => {
    const mockUser: IUser = { _id: 'u1', email: 'test@example.com' } as any;

    const mockState: Partial<IStore> = {
        user: {
            currentUser: mockUser,
            isFetching: true,
            signInEmail: 'test@example.com',
            userError: 'Error message',
        },
    };

    it('selectCurrentUser should return currentUser', () => {
        expect(selectCurrentUser(mockState as IStore)).toEqual(mockUser);
    });

    it('selectIsLoadingData should return isFetching flag', () => {
        expect(selectIsLoadingData(mockState as IStore)).toBe(true);
    });

    it('selectUserError should return userError string', () => {
        expect(selectUserError(mockState as IStore)).toBe('Error message');
    });

    it('selectLoginEmail should return signInEmail', () => {
        expect(selectLoginEmail(mockState as IStore)).toBe('test@example.com');
    });
});
