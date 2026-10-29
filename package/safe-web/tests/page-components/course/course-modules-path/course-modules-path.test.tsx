import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseModulesPath from '../../../../src/page-components/course/course-modules-path/course-modules-path';

describe('CourseModulesPath Component', () => {
    it('should render 7 module nodes and handle section select via click', () => {
        const handleSelect = vi.fn();
        render(<CourseModulesPath onSelectSection={handleSelect} />);

        for (let i = 1; i <= 7; i++) {
            expect(screen.getByAltText(`Module Section ${i}`)).toBeInTheDocument();
        }

        const firstNode = screen.getByAltText('Module Section 1');
        fireEvent.click(firstNode);
        expect(handleSelect).toHaveBeenCalledWith(0);
    });

    it('should handle keyboard enter activation', () => {
        const handleSelect = vi.fn();
        render(<CourseModulesPath onSelectSection={handleSelect} />);

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(7);

        fireEvent.keyDown(buttons[1], { key: 'Enter', code: 'Enter' });
        expect(handleSelect).toHaveBeenCalledWith(1);
    });
});
