import React from "react";
import { useTranslate } from "@tolgee/react";
import type { IQuestionComponentProps } from "../questions.types";
import GameButton from "../../../components/game-button/game-button";
import styles from "../questions.module.scss";

const FitTiles: React.FC<IQuestionComponentProps> = ({
    question,
    showAnswer,
    playerResponse,
}) => {
    const { t } = useTranslate();
    const answers = question.answers || [];

    return (
        <div className={styles.questionContainer}>
            <p className={styles.questionTitle}>{t(question.question || "")}</p>
            <div className={styles.tilesGrid}>
                {answers.map((ans, idx) => {
                    const isSelected = playerResponse === ans;
                    const isCorrect = showAnswer && question.correctAnswer === ans;
                    return (
                        <GameButton
                            key={`tile-${idx}`}
                            size="tile"
                            color={isCorrect ? "correct" : isSelected ? "violet" : "glass"}
                            selected={isSelected}
                            number={idx + 1}
                        >
                            {ans ? t(ans) : `Tile ${idx + 1}`}
                        </GameButton>
                    );
                })}
            </div>
        </div>
    );
};

export default FitTiles;
