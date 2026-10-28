import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleSwitch from '../../../src/components/toggle-switch/toggle-switch';

describe('ToggleSwitch Component', () => {
    it('should render label and trigger onToggle on click', () => {
        const handleToggle = vi.fn();
        render(<ToggleSwitch label="Notifications" value={false} onToggle={handleToggle} />);
        expect(screen.getByText('Notifications')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Notifications').previousSibling as HTMLElement);
        expect(handleToggle).toHaveBeenCalledTimes(1);
    });
});
