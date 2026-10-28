import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionRenderer from '../../../src/page-components/questions/index';
import { TYPES_ENUM } from '../../../src/helpers/constants/course';

describe('QuestionRenderer Component', () => {
    it('should render SingleChoose when type is SINGLE_CHOOSE', () => {
        render(
            <QuestionRenderer
                question={{
                    type: TYPES_ENUM.SINGLE_CHOOSE,
                    question: 'Rate your security level',
                }}
                showAnswer={false}
            />
        );
        expect(screen.getByText('Rate your security level')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should render TrueFalse when type is TRUE_FALSE', () => {
        render(
            <QuestionRenderer
                question={{
                    type: TYPES_ENUM.TRUE_FALSE,
                    question: 'Passwords should be shared',
                    answers: ['True', 'False'],
                }}
                showAnswer={false}
            />
        );
        expect(screen.getByText('Passwords should be shared')).toBeInTheDocument();
        expect(screen.getByText('True')).toBeInTheDocument();
        expect(screen.getByText('False')).toBeInTheDocument();
    });
});
