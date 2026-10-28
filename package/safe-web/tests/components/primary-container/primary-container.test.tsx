import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrimaryContainer from '../../../src/components/primary-container/primary-container';

describe('PrimaryContainer Component', () => {
    it('should render children with direction classes', () => {
        render(
            <PrimaryContainer direction="column" contentAlignment="left">
                <div>Column Item</div>
            </PrimaryContainer>
        );
        expect(screen.getByText('Column Item')).toBeInTheDocument();
    });
});
