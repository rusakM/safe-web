import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import FillRegisterData from '../../../src/pages/fill-register-data/fill-register-data';
import { renderWithProviders } from '../../test-utils';

describe('FillRegisterData Page', () => {
    it('should render first name, last name, and country inputs', () => {
        renderWithProviders(<FillRegisterData />);
        expect(screen.getByText('sign-up.fill-register-data')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('sign-up.register-form.first-name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('sign-up.register-form.last-name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('sign-up.register-form.country')).toBeInTheDocument();
    });
});
