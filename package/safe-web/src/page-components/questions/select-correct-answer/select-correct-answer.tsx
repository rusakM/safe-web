import React from "react";
import { useTranslate } from "@tolgee/react";
import type { IQuestionComponentProps } from "../questions.types";
import GameButton from "../../../components/game-button/game-button";
import styles from "../questions.module.scss";

const SelectCorrectAnswer: React.FC<IQuestionComponentProps> = ({
    question,
    showAnswer,
    playerResponse,
}) => {
    const { t } = useTranslate();
    const answers = question.answers || [];
    const mediaList = question.media || [];

    return (
        <div className={styles.questionContainer}>
            <p className={styles.questionTitle}>{t(question.question || "")}</p>
            {mediaList.length > 0 && (
                <div className={styles.mediaContainer}>
                    {mediaList.map((item, idx) => (
                        item.url && (
                            <img
                                key={`question-media-${idx}`}
                                src={item.url}
                                alt={item.name || `Question Media ${idx + 1}`}
                                className={styles.questionImage}
                            />
                        )
                    ))}
                </div>
            )}
            <div className={styles.optionsGrid}>
                {answers.map((ans, idx) => {
                    const isSelected = playerResponse === ans;
                    const isCorrect = showAnswer && question.correctAnswer === ans;
                    return (
                        <GameButton
                            key={`option-${idx}`}
                            size="standard"
                            color={isCorrect ? "correct" : isSelected ? "violet" : "glass"}
                            selected={isSelected}
                        >
                            {ans ? t(ans) : `Option ${idx + 1}`}
                        </GameButton>
                    );
                })}
            </div>
        </div>
    );
};

export default SelectCorrectAnswer;
