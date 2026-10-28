import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Course from '../../../src/pages/course/course';
import { renderWithProviders } from '../../test-utils';
import { constantsCourse } from '../../../src/helpers/constants';
import type { ICourse, IPlayerCourse } from '../../../src/types/course';

const mockCourse: ICourse = {
    _id: 'course-123',
    courseNumber: 1,
    nameTranslation: 'course.1',
    bibliography: [
        { title: 'Source 1', url: 'https://safeweb.org/ref1' }
    ],
    modules: [
        {
            moduleNumber: 1,
            moduleNameTranslation: 'Module 1',
            questions: [
                {
                    questionNumber: 1,
                    type: constantsCourse.TYPES_ENUM.SINGLE_CHOOSE,
                    question: 'What is phishing?',
                    answers: ['Option 1', 'Option 2'],
                    correctAnswerIndex: 0,
                    maxPoints: 1,
                }
            ]
        }
    ]
};

const mockPlayerCourse: IPlayerCourse = {
    _id: 'player-c-1',
    courseId: 'course-123',
    isFinished: false,
    questionScores: [
        {
            module: 1,
            question: 1,
            response: 'Option 1',
            points: 1,
        }
    ]
};

describe('Course Page', () => {
    it('should render course modules by default', () => {
        renderWithProviders(<Course />, {
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

        expect(screen.getByText('Module 1')).toBeInTheDocument();
    });

    it('should render bibliography when overrideViewMode="bibliography"', () => {
        renderWithProviders(<Course overrideViewMode="bibliography" />, {
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

        expect(screen.getByText('Source 1')).toBeInTheDocument();
    });

    it('should render question when overrideViewMode="question"', () => {
        renderWithProviders(<Course overrideViewMode="question" />, {
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

        expect(screen.getByText('What is phishing?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    });

    it('should render custom children when provided', () => {
        renderWithProviders(
            <Course>
                <div data-testid="custom-child">Custom Content</div>
            </Course>,
            {
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
            }
        );

        expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    });
});
