import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseHeader from '../../../src/components/course-header/course-header';

describe('CourseHeader Component', () => {
    it('should render module title and trigger navigation callbacks', () => {
        const handleBack = vi.fn();
        const handleNext = vi.fn();

        render(
            <CourseHeader
                module={1}
                section={1}
                goBack={handleBack}
                goNext={handleNext}
                showBibliography={false}
            />
        );

        expect(screen.getByText('active.course.hub.module.title.1')).toBeInTheDocument();
        const nextImg = screen.getByAltText('next');
        fireEvent.click(nextImg);
        expect(handleNext).toHaveBeenCalled();
    });
});
