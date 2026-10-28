import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import CourseSummary from '../../../src/pages/course-summary/course-summary';
import { renderWithProviders } from '../../test-utils';
import { constantsCourse } from '../../../src/helpers/constants';
import type { ICourse, IPlayerCourse } from '../../../src/types/course';

const mockCourse: ICourse = {
    _id: 'c-summary-1',
    courseNumber: 1,
    nameTranslation: 'Course Summary',
    modules: [
        {
            moduleNumber: 1,
            moduleNameTranslation: 'Summary Module 1',
            questions: [
                {
                    questionNumber: 1,
                    type: constantsCourse.TYPES_ENUM.SINGLE_CHOOSE,
                    question: 'Summary Question 1?',
                    answers: ['Answer A', 'Answer B'],
                    correctAnswerIndex: 0,
                    maxPoints: 1,
                },
                {
                    questionNumber: 2,
                    type: constantsCourse.TYPES_ENUM.SINGLE_CHOOSE,
                    question: 'Info content without score',
                    answers: [],
                    maxPoints: 0, // should be skipped
                }
            ]
        }
    ]
};

const mockPlayerCourse: IPlayerCourse = {
    _id: 'player-summary-1',
    courseId: 'c-summary-1',
    isFinished: true,
    questionScores: [
        {
            module: 1,
            question: 1,
            response: 'Answer A',
            points: 1,
        }
    ]
};

describe('CourseSummary Page', () => {
    it('should render module title and question items with show answer toggle', () => {
        renderWithProviders(<CourseSummary />, {
            preloadedState: {
                course: {
                    currentCourse: mockCourse,
                    playerCourse: mockPlayerCourse,
                    isLoading: false,
                    error: null,
                    coursesList: [],
                    playerCourses: [],
                } as any,
            },
        });

        expect(screen.getByText('Summary Module 1')).toBeInTheDocument();
        expect(screen.getByText('Summary Question 1?')).toBeInTheDocument();
        expect(screen.queryByText('Info content without score')).not.toBeInTheDocument();
        expect(screen.getByText('course.results.show.answers.button')).toBeInTheDocument();
    });

    it('should toggle answer and display feedback icon when toggle is clicked', () => {
        renderWithProviders(<CourseSummary />, {
            preloadedState: {
                course: {
                    currentCourse: mockCourse,
                    playerCourse: mockPlayerCourse,
                    isLoading: false,
                    error: null,
                    coursesList: [],
                    playerCourses: [],
                } as any,
            },
        });

        // Feedback icon shouldn't be visible before toggle
        expect(screen.queryByAltText('Correct')).not.toBeInTheDocument();

        // Click toggle label
        const toggle = screen.getByText('course.results.show.answers.button');
        fireEvent.click(toggle.previousSibling as HTMLElement);

        // Feedback icon should now be displayed
        expect(screen.getByAltText('Correct')).toBeInTheDocument();
    });

    it('should handle close button click', () => {
        renderWithProviders(<CourseSummary />, {
            preloadedState: {
                course: {
                    currentCourse: mockCourse,
                    playerCourse: mockPlayerCourse,
                    isLoading: false,
                    error: null,
                    coursesList: [],
                    playerCourses: [],
                } as any,
            },
        });

        const closeBtn = screen.getByRole('button', { name: /close/i });
        expect(closeBtn).toBeInTheDocument();
        fireEvent.click(closeBtn);
    });
});
