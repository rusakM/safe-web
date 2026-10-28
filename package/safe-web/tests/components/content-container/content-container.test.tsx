import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentContainer from '../../../src/components/content-container/content-container';

describe('ContentContainer Component', () => {
    it('should render children within container', () => {
        render(
            <ContentContainer>
                <span>Inner text</span>
            </ContentContainer>
        );
        expect(screen.getByText('Inner text')).toBeInTheDocument();
    });
});
