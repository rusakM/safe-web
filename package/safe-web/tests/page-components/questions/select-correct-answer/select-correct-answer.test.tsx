import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SelectCorrectAnswer from '../../../../src/page-components/questions/select-correct-answer/select-correct-answer';

describe('SelectCorrectAnswer Component', () => {
    it('should render question title and choices', () => {
        render(
            <SelectCorrectAnswer
                question={{
                    question: 'Select the odd one out',
                    answers: ['Option 1', 'Option 2'],
                }}
                showAnswer={false}
            />
        );

        expect(screen.getByText('Select the odd one out')).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
});
