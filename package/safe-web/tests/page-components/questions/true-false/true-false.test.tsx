import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrueFalse from '../../../../src/page-components/questions/true-false/true-false';

describe('TrueFalse Component', () => {
    it('should render True and False options', () => {
        render(
            <TrueFalse
                question={{
                    question: 'Never share OTP codes',
                    answers: ['True', 'False'],
                    correctAnswer: 'True',
                }}
                showAnswer={true}
                playerResponse="True"
            />
        );

        expect(screen.getByText('Never share OTP codes')).toBeInTheDocument();
        expect(screen.getByText('True')).toBeInTheDocument();
        expect(screen.getByText('False')).toBeInTheDocument();
    });
});
