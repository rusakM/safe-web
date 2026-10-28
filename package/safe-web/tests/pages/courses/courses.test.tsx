import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Courses from '../../../src/pages/courses/courses';
import { renderWithProviders } from '../../test-utils';

describe('Courses Page', () => {
    it('should render course cards list', () => {
        renderWithProviders(<Courses />);
        expect(screen.getByText('manuals.header')).toBeInTheDocument();
        expect(screen.getByText('landing-page.carousel.fake-news')).toBeInTheDocument();
        expect(screen.getByText('landing-page.carousel.cyberbullying')).toBeInTheDocument();
    });
});
