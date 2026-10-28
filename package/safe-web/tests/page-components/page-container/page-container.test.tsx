import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PageContainer from '../../../src/page-components/page-container/page-container';
import { renderWithProviders } from '../../test-utils';

describe('PageContainer Component', () => {
    it('should render header and children content', () => {
        renderWithProviders(
            <PageContainer>
                <div>Page body child element</div>
            </PageContainer>
        );

        expect(screen.getByAltText('Safe-Web Logo')).toBeInTheDocument();
        expect(screen.getByText('Page body child element')).toBeInTheDocument();
    });
});
