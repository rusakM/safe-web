import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MultiChoose from '../../../../src/page-components/questions/multi-choose/multi-choose';

describe('MultiChoose Component', () => {
    it('should render question title and all answer options', () => {
        render(
            <MultiChoose
                question={{
                    question: 'Select safe practices',
                    answers: ['2FA', 'Strong password', 'Public Wi-Fi'],
                }}
                showAnswer={false}
                playerResponse="2FA"
            />
        );

        expect(screen.getByText('Select safe practices')).toBeInTheDocument();
        expect(screen.getByText('2FA')).toBeInTheDocument();
        expect(screen.getByText('Strong password')).toBeInTheDocument();
        expect(screen.getByText('Public Wi-Fi')).toBeInTheDocument();
    });
});
