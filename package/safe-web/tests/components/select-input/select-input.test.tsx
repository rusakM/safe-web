import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectInput from '../../../src/components/select-input/select-input';

describe('SelectInput Component', () => {
    const options = [
        { label: 'Poland', value: 'PL' },
        { label: 'France', value: 'FR' },
    ];

    it('should open dropdown on click and select option', () => {
        const handleChange = vi.fn();
        render(<SelectInput placeholder="Select country" options={options} onChange={handleChange} />);
        const input = screen.getByPlaceholderText('Select country');

        fireEvent.click(input);
        expect(screen.getByText('Poland')).toBeInTheDocument();
        expect(screen.getByText('France')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Poland'));
        expect(handleChange).toHaveBeenCalledWith('PL');
    });
});
