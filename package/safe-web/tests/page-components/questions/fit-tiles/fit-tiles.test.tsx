import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FitTiles from '../../../../src/page-components/questions/fit-tiles/fit-tiles';

describe('FitTiles Component', () => {
    it('should render tiles with question title and numbers', () => {
        render(
            <FitTiles
                question={{
                    question: 'Match terms to definitions',
                    answers: ['Phishing', 'Malware'],
                }}
                showAnswer={false}
            />
        );

        expect(screen.getByText('Match terms to definitions')).toBeInTheDocument();
        expect(screen.getByText('Phishing')).toBeInTheDocument();
        expect(screen.getByText('Malware')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });
});
