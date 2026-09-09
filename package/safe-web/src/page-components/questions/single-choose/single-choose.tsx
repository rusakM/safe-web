import React from "react";
import { useTranslate } from "@tolgee/react";
import type { IQuestionComponentProps } from "../questions.types";
import GameButton from "../../../components/game-button/game-button";
import styles from "../questions.module.scss";

const SingleChoose: React.FC<IQuestionComponentProps> = ({
    question,
    showAnswer,
    playerResponse,
    onSelectAnswer,
}) => {
    const { t } = useTranslate();
    const [localResponse, setLocalResponse] = React.useState<string>("");
    const scaleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const currentResponse = playerResponse || localResponse;

    const handleNumClick = (num: number) => {
        const val = num.toString();
        setLocalResponse(val);
        if (onSelectAnswer) {
            onSelectAnswer(val);
        }
    };

    return (
        <div className={styles.questionContainer}>
            <p className={styles.questionTitle}>{t(question.question || "")}</p>
            <div className={styles.scaleGrid}>
                {scaleNumbers.map((num) => {
                    const isSelected = currentResponse === num.toString();
                    const isCorrect = showAnswer && isSelected;
                    return (
                        <GameButton
                            key={`scale-${num}`}
                            size="scale"
                            color={isCorrect ? "correct" : isSelected ? "violet" : "glass"}
                            selected={isSelected}
                            onClick={() => handleNumClick(num)}
                        >
                            {num}
                        </GameButton>
                    );
                })}
            </div>
        </div>
    );
};

export default SingleChoose;
