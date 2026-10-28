import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CourseBibliography from '../../../../src/page-components/course/course-bibliography/course-bibliography';

describe('CourseBibliography Component', () => {
    it('should render bibliography title and list items with links', () => {
        const bibliography = [
            { title: 'EU Cyber Guide', url: 'https://europa.eu/cyber' },
            { title: 'Safety Book', url: 'https://example.com/book' },
        ];

        render(<CourseBibliography bibliography={bibliography} />);

        expect(screen.getByText('active.course.hub.bibliography.button')).toBeInTheDocument();
        expect(screen.getByText('EU Cyber Guide')).toBeInTheDocument();
        expect(screen.getByText('Safety Book')).toBeInTheDocument();
        expect(screen.getByText('https://europa.eu/cyber')).toBeInTheDocument();
    });
});
