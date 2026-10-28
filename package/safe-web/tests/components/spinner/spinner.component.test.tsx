import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../../../src/components/spinner/spinner.component';

describe('Spinner Component', () => {
    it('should render description when provided', () => {
        render(<Spinner description="Loading courses..." />);
        expect(screen.getByText('Loading courses...')).toBeInTheDocument();
    });
});
