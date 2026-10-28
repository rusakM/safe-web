import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownMenu from '../../../src/components/dropdown-menu/dropdown-menu';

describe('DropdownMenu Component', () => {
    it('should render items when isOpen is true and handle select', () => {
        const handleSelect = vi.fn();
        const items: [string, string][] = [
            ['pl', 'Polski'],
            ['en', 'English'],
        ];

        render(
            <DropdownMenu
                isOpen={true}
                items={items}
                onItemSelect={handleSelect}
            />
        );

        expect(screen.getByText('Polski')).toBeInTheDocument();
        fireEvent.click(screen.getByText('English'));
        expect(handleSelect).toHaveBeenCalledWith('en');
    });

    it('should not render anything when isOpen is false', () => {
        const { container } = render(
            <DropdownMenu
                isOpen={false}
                items={[['pl', 'Polski']]}
            />
        );
        expect(container).toBeEmptyDOMElement();
    });
});
