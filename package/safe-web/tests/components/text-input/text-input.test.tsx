import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../../../src/components/text-input/text-input';

describe('TextInput Component', () => {
    it('should render input with placeholder and value', () => {
        render(<TextInput placeholder="Enter email" value="test@test.com" onChange={() => {}} />);
        const input = screen.getByPlaceholderText('Enter email');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('test@test.com');
    });

    it('should handle change event', () => {
        const handleChange = vi.fn();
        render(<TextInput placeholder="Type here" onChange={handleChange} />);
        const input = screen.getByPlaceholderText('Type here');
        fireEvent.change(input, { target: { value: 'New text' } });
        expect(handleChange).toHaveBeenCalled();
    });
});
