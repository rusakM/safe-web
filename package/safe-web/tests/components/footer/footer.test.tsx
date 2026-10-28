import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../../src/components/footer/footer';

describe('Footer Component', () => {
    it('should render footer texts and copyright', () => {
        render(<Footer />);
        expect(screen.getByText('footer.text-1')).toBeInTheDocument();
        expect(screen.getByText('footer.privacy-policy')).toBeInTheDocument();
        expect(screen.getByText('footer.conditions-terms')).toBeInTheDocument();
        expect(screen.getByText('footer.copyright')).toBeInTheDocument();
    });
});
