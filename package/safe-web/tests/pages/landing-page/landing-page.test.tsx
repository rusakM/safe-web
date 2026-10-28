import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import LandingPage from '../../../src/pages/landing-page/landing-page';
import { renderWithProviders } from '../../test-utils';

describe('LandingPage Page', () => {
    it('should render main hero header and login button when user is not logged in', () => {
        renderWithProviders(<LandingPage />);
        expect(screen.getByText('landing-page.header1')).toBeInTheDocument();
        expect(screen.getByText('landing-page.buttons.login')).toBeInTheDocument();
        expect(screen.getByText('landing-page.header3')).toBeInTheDocument();
    });
});
