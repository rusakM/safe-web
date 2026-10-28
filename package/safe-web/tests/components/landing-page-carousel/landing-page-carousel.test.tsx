import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LandingPageCarousel from '../../../src/components/landing-page-carousel/landing-page-carousel';

describe('LandingPageCarousel Component', () => {
    it('should render carousel title and swipe buttons', () => {
        render(<LandingPageCarousel />);
        expect(screen.getByText('landing-page.header2')).toBeInTheDocument();

        const leftButton = screen.getByAltText('<');
        const rightButton = screen.getByAltText('>');

        expect(leftButton).toBeInTheDocument();
        expect(rightButton).toBeInTheDocument();

        fireEvent.click(rightButton);
        expect(screen.getByText('landing-page.header2')).toBeInTheDocument();
    });
});
