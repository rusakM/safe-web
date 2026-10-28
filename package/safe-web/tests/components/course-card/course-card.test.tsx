import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseCard from '../../../src/components/course-card/course-card';

describe('CourseCard Component', () => {
    it('should render header and description and trigger start', () => {
        const handleStart = vi.fn();
        render(
            <CourseCard
                header="Module 1: Safe Browsing"
                description="Learn how to spot phishing"
                start={handleStart}
            />
        );
        expect(screen.getByText('Module 1: Safe Browsing')).toBeInTheDocument();
        expect(screen.getByText('Learn how to spot phishing')).toBeInTheDocument();

        fireEvent.click(screen.getByText('course.buttons.start'));
        expect(handleStart).toHaveBeenCalledTimes(1);
    });
});
