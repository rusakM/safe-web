import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Flipbook } from '../../../src/page-components/flipbook/flipbook';
import { LocalesEnum } from '../../../src/helpers/constants/translations';
import type { IMaterial } from '../../../src/types/material';

vi.mock('react-pdf', () => ({
    Document: ({ children }: any) => <div>{children}</div>,
    Page: () => <div>PDF Page Mock</div>,
    pdfjs: { GlobalWorkerOptions: { workerSrc: '' } },
}));

describe('Flipbook Component', () => {
    const mockMaterial: IMaterial = {
        _id: 'm1',
        materialNumber: 1,
        names: {
            [LocalesEnum.en]: { name: 'guide.pdf', pages: 5 },
            [LocalesEnum.pl]: { name: 'guide.pdf', pages: 5 },
            [LocalesEnum.el]: { name: 'guide.pdf', pages: 5 },
            [LocalesEnum.fr]: { name: 'guide.pdf', pages: 5 },
            [LocalesEnum.it]: { name: 'guide.pdf', pages: 5 },
            [LocalesEnum.pt]: { name: 'guide.pdf', pages: 5 },
            [LocalesEnum.sl]: { name: 'guide.pdf', pages: 5 },
            [LocalesEnum.sv]: { name: 'guide.pdf', pages: 5 },
        },
        translation: 'guide',
    };

    beforeEach(() => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(new Blob(['pdf content'])),
        } as any);
        globalThis.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');
        globalThis.URL.revokeObjectURL = vi.fn();
    });

    it('should render toolbar with pagination, zoom and close buttons', () => {
        const handleClose = vi.fn();
        render(<Flipbook material={mockMaterial} onClose={handleClose} />);

        expect(screen.getByText('1/5')).toBeInTheDocument();
        const closeBtn = screen.getByLabelText('Close');
        fireEvent.click(closeBtn);
        expect(handleClose).toHaveBeenCalled();
    });
});
