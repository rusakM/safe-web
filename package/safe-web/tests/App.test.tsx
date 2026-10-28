import React, { Suspense } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../src/App';
import { renderWithProviders } from './test-utils';
import { UserRoleEnum } from '../src/types/user';

describe('App Component', () => {
    it('should render LandingPage on root route "/" for unauthenticated user', () => {
        renderWithProviders(
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>,
            {
                route: '/',
                preloadedState: {
                    user: {
                        currentUser: null,
                        isLoading: false,
                        error: null,
                    } as any,
                },
            }
        );

        // Header and hero elements should be present
        expect(screen.getByText('landing-page.header1')).toBeInTheDocument();
        expect(screen.getByText('landing-page.buttons.login')).toBeInTheDocument();
    });

    it('should redirect unauthenticated users away from protected route "/my-profile" to "/"', () => {
        renderWithProviders(
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>,
            {
                route: '/my-profile',
                preloadedState: {
                    user: {
                        currentUser: null,
                        isLoading: false,
                        error: null,
                    } as any,
                },
            }
        );

        // Because unauthenticated users are redirected to '/', LandingPage is shown
        expect(screen.getByText('landing-page.header1')).toBeInTheDocument();
    });

    it('should allow authenticated users on protected route', async () => {
        renderWithProviders(
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>,
            {
                route: '/courses',
                preloadedState: {
                    user: {
                        currentUser: {
                            _id: 'u1',
                            email: 'user@safeweb.org',
                            firstName: 'Anna',
                            lastName: 'Nowak',
                            role: UserRoleEnum.STUDENT,
                            isEnabled: true,
                        },
                        isLoading: false,
                        error: null,
                    } as any,
                    course: {
                        coursesList: [],
                        playerCourses: [],
                        isLoading: false,
                        error: null,
                    } as any,
                },
            }
        );

        // Courses page should load
        expect(await screen.findByText('manuals.header')).toBeInTheDocument();
    });
});
