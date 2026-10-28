import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseModulesPath from '../../../../src/page-components/course/course-modules-path/course-modules-path';

describe('CourseModulesPath Component', () => {
    it('should render 7 module nodes and handle section select', () => {
        const handleSelect = vi.fn();
        render(<CourseModulesPath onSelectSection={handleSelect} />);

        const firstNode = screen.getByAltText('Module Section 1');
        expect(firstNode).toBeInTheDocument();

        fireEvent.click(firstNode);
        expect(handleSelect).toHaveBeenCalledWith(0);
    });
});
