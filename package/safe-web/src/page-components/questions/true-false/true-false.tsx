import React from "react";
import { useTranslate } from "@tolgee/react";
import type { IQuestionComponentProps } from "../questions.types";
import GameButton from "../../../components/game-button/game-button";
import styles from "../questions.module.scss";

const TrueFalse: React.FC<IQuestionComponentProps> = ({
    question,
    showAnswer,
    playerResponse,
}) => {
    const { t } = useTranslate();
    const answers = question.answers?.length ? question.answers : ["True", "False"];

    return (
        <div className={styles.questionContainer}>
            <p className={styles.questionTitle}>{t(question.question || "")}</p>
            <div className={styles.optionsGrid}>
                {answers.map((ans, idx) => {
                    const isSelected = playerResponse === ans;
                    const isCorrect = showAnswer && question.correctAnswer === ans;
                    return (
                        <GameButton
                            key={`tf-${idx}`}
                            size="standard"
                            color={isCorrect ? "correct" : isSelected ? "violet" : "glass"}
                            selected={isSelected}
                        >
                            {t(ans)}
                        </GameButton>
                    );
                })}
            </div>
        </div>
    );
};

export default TrueFalse;
