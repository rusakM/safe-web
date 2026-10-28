import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import SignIn from '../../../src/pages/sign-in/sign-in';
import { renderWithProviders } from '../../test-utils';

describe('SignIn Page', () => {
    it('should render email input and signin buttons', () => {
        renderWithProviders(<SignIn />);
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByText('main.register-question')).toBeInTheDocument();
        expect(screen.getByText('main.back')).toBeInTheDocument();
    });
});
