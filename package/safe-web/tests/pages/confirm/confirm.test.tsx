import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Confirm from '../../../src/pages/confirm/confirm';
import { renderWithProviders } from '../../test-utils';

describe('Confirm Page', () => {
    it('should render verification code input and confirm button', () => {
        renderWithProviders(<Confirm />);
        expect(screen.getByText('signin.confirm.header.enter-code')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('signin.confirm.input-placeholder')).toBeInTheDocument();
        expect(screen.getByText('main.confirm')).toBeInTheDocument();
    });
});
