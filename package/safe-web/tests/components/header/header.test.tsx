import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Header from '../../../src/components/header/header';
import { renderWithProviders } from '../../test-utils';

describe('Header Component', () => {
    it('should render logo and language selector button', () => {
        renderWithProviders(<Header />);
        expect(screen.getByAltText('Safe-Web Logo')).toBeInTheDocument();
        expect(screen.getByAltText('Select language')).toBeInTheDocument();
    });

    it('should render user controls when user is logged in', () => {
        const preloadedState = {
            user: {
                currentUser: { _id: 'u1', email: 'test@example.com', firstName: 'Jan' } as any,
                isFetching: false,
                signInEmail: '',
                userError: '',
            },
        };
        renderWithProviders(<Header />, { preloadedState });
        expect(screen.getByAltText('Profile')).toBeInTheDocument();
    });
});
