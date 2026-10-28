import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MaterialsCard from '../../../src/components/materials-card/materials-card';

describe('MaterialsCard Component', () => {
    it('should render header and action buttons', () => {
        const handleDownload = vi.fn();
        const handleResize = vi.fn();

        render(
            <MaterialsCard
                header="Teacher Handbook"
                description="Comprehensive guide"
                downloadAction={handleDownload}
                resizeAction={handleResize}
            />
        );

        expect(screen.getByText('Teacher Handbook')).toBeInTheDocument();
        expect(screen.getByText('Comprehensive guide')).toBeInTheDocument();

        const downloadBtn = screen.getByTitle('manuals.placeholder.download');
        fireEvent.click(downloadBtn);
        expect(handleDownload).toHaveBeenCalled();
    });
});
