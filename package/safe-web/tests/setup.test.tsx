import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Frontend Vitest Setup', () => {
    it('should pass basic environment test', () => {
        expect(document).toBeDefined();
        expect(window).toBeDefined();
    });

    it('should render a basic element and test jest-dom matchers', () => {
        render(<div>Hello SafeWeb Vitest</div>);
        expect(screen.getByText('Hello SafeWeb Vitest')).toBeInTheDocument();
    });
});
