import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import SignUp from '../../../src/pages/sign-up/sign-up';
import { renderWithProviders } from '../../test-utils';

describe('SignUp Page', () => {
    it('should render registration form with terms checkbox', () => {
        renderWithProviders(<SignUp />);
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByText('main.login-question')).toBeInTheDocument();
    });
});
