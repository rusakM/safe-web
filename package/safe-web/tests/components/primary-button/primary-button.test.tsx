import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from '../../../src/components/primary-button/primary-button';

describe('PrimaryButton Component', () => {
    it('should render children text', () => {
        render(<PrimaryButton color="violet">Click Me</PrimaryButton>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should handle onClick callback when clicked', () => {
        const handleClick = vi.fn();
        render(<PrimaryButton color="grey" onClick={handleClick}>Submit</PrimaryButton>);
        fireEvent.click(screen.getByText('Submit'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should apply disabled attribute and not click when disabled', () => {
        const handleClick = vi.fn();
        render(<PrimaryButton color="red" disabled={true} onClick={handleClick}>Disabled</PrimaryButton>);
        const button = screen.getByText('Disabled');
        expect(button).toBeDisabled();
        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });
});
