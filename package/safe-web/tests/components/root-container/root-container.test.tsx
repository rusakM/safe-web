import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootContainer from '../../../src/components/root-container/root-container';

describe('RootContainer Component', () => {
    it('should render children within container viewer', () => {
        render(
            <RootContainer>
                <div>Application Layout Content</div>
            </RootContainer>
        );
        expect(screen.getByText('Application Layout Content')).toBeInTheDocument();
    });
});
