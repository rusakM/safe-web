import type { IQuestion } from "../../types/course";

export interface IQuestionComponentProps {
    question: IQuestion;
    showAnswer: boolean;
    playerResponse?: string;
    isAnswerCorrect?: boolean;
    onSelectAnswer?: (response: string) => void;
}
