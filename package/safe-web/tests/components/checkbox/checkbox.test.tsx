import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../../../src/components/checkbox/checkbox';

describe('Checkbox Component', () => {
    it('should render label text and reflect checked state', () => {
        render(<Checkbox checked={true} label="Accept Terms" />);
        expect(screen.getByText('Accept Terms')).toBeInTheDocument();
        const input = screen.getByRole('checkbox');
        expect(input).toBeChecked();
    });

    it('should fire onChange when clicked', () => {
        const handleChange = vi.fn();
        render(<Checkbox checked={false} label="Option" onChange={handleChange} />);
        fireEvent.click(screen.getByRole('checkbox'));
        expect(handleChange).toHaveBeenCalled();
    });
});
