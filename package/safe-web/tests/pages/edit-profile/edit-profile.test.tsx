import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import EditProfile from '../../../src/pages/edit-profile/edit-profile';
import { renderWithProviders } from '../../test-utils';

describe('EditProfile Page', () => {
    it('should render profile form with remove account button', () => {
        const preloadedState = {
            user: {
                currentUser: {
                    _id: 'u1',
                    email: 'jan@example.com',
                    firstName: 'Jan',
                    lastName: 'Kowalski',
                    countryCode: 'PL',
                } as any,
                isFetching: false,
                signInEmail: '',
                userError: '',
            },
        };

        renderWithProviders(<EditProfile />, { preloadedState });
        expect(screen.getByText('profil.tab.header')).toBeInTheDocument();
        expect(screen.getByText('profile.tab.RemoveAccount.button')).toBeInTheDocument();
        expect(screen.getByDisplayValue('jan@example.com')).toBeInTheDocument();
    });
});
