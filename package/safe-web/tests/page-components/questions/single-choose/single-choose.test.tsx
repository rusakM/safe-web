import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SingleChoose from '../../../../src/page-components/questions/single-choose/single-choose';

describe('SingleChoose Component', () => {
    it('should render 1-10 scale buttons and handle click', () => {
        const handleSelect = vi.fn();
        render(
            <SingleChoose
                question={{ question: 'Confidence scale' }}
                showAnswer={false}
                onSelectAnswer={handleSelect}
            />
        );

        expect(screen.getByText('Confidence scale')).toBeInTheDocument();
        const button7 = screen.getByText('7');
        fireEvent.click(button7);
        expect(handleSelect).toHaveBeenCalledWith('7');
    });
});
