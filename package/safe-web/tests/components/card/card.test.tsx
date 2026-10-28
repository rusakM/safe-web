import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../../src/components/card/card';

describe('Card Component', () => {
    it('should render children content inside container', () => {
        render(
            <Card>
                <div data-testid="card-child">Card content</div>
            </Card>
        );
        expect(screen.getByTestId('card-child')).toBeInTheDocument();
        expect(screen.getByText('Card content')).toBeInTheDocument();
    });
});
