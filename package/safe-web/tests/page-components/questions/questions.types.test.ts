import { describe, it, expect } from 'vitest';
import type { IQuestionComponentProps } from '../../../src/page-components/questions/questions.types';

describe('Question Component Props Types', () => {
    it('should typecheck IQuestionComponentProps interface', () => {
        const props: IQuestionComponentProps = {
            question: { question: 'Is this safe?', maxPoints: 1 },
            showAnswer: false,
            playerResponse: 'yes',
            isAnswerCorrect: true,
            onSelectAnswer: () => {},
        };
        expect(props.question.question).toBe('Is this safe?');
        expect(props.showAnswer).toBe(false);
    });
});
