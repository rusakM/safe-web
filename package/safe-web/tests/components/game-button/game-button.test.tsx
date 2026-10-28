import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GameButton from '../../../src/components/game-button/game-button';

describe('GameButton Component', () => {
    it('should render children and number badge when provided', () => {
        render(<GameButton number={1}>Option A</GameButton>);
        expect(screen.getByText('Option A')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should fire onClick event', () => {
        const handleClick = vi.fn();
        render(<GameButton onClick={handleClick}>Answer</GameButton>);
        fireEvent.click(screen.getByText('Answer'));
        expect(handleClick).toHaveBeenCalled();
    });
});
