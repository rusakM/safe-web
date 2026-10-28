import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CardText from '../../../src/components/card-text/card-text';

describe('CardText Component', () => {
    it('should render text and toggle wrap state on click', () => {
        render(<CardText text="Sample long card explanation text" />);
        const paragraph = screen.getByText('Sample long card explanation text');
        expect(paragraph).toBeInTheDocument();

        fireEvent.click(paragraph);
        expect(paragraph).toBeInTheDocument();
    });
});
