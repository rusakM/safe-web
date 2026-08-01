import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslate } from "@tolgee/react";

import PageContainer from "../../page-components/page-container/page-container";
import PrimaryContainer from "../../components/primary-container/primary-container";
import ToggleSwitch from "../../components/toggle-switch/toggle-switch";
import QuestionRenderer from "../../page-components/questions";

import {
    selectCurrentCourse,
    selectPlayerCourse,
} from "../../redux/course/course.selectors";
import {
    fetchCourseStart,
    fetchPlayerCourseStart,
} from "../../redux/course/course.actions";

import styles from "./course-summary.module.scss";
import commonStyles from "../../styles/common.module.scss";

import CloseIcon from "../../assets/icons/close_gradient.svg";
import FeedbackCorrect from "../../assets/icons/feedback_correct.svg";
import FeedbackIncorrect from "../../assets/icons/feedback_incorrect.svg";
import { constantsUrls } from "../../helpers/constants";

const CourseSummary: React.FC = () => {
    const { t } = useTranslate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId } = useParams<{ courseId: string }>();

    const course = useSelector(selectCurrentCourse);
    const playerCourse = useSelector(selectPlayerCourse);

    const [showAnswersMap, setShowAnswersMap] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (courseId) {
            if (!course || course._id !== courseId) {
                dispatch(fetchCourseStart(courseId));
            }
            if (!playerCourse || playerCourse.courseId !== courseId) {
                dispatch(fetchPlayerCourseStart(courseId));
            }
        }
    }, [courseId, course, playerCourse, dispatch]);

    const toggleShowAnswer = useCallback((questionKey: string) => {
        setShowAnswersMap((prev) => ({
            ...prev,
            [questionKey]: !prev[questionKey],
        }));
    }, []);

    const handleClose = useCallback(() => {
        navigate(constantsUrls.Main.courses);
    }, [navigate]);

    const getQuestionScore = useCallback(
        (moduleNum?: number, qNum?: number) => {
            return playerCourse?.questionScores?.find(
                (qs) => qs.module === moduleNum && qs.question === qNum
            );
        },
        [playerCourse?.questionScores]
    );

    return (
        <PageContainer>
            <PrimaryContainer direction="column" additionalClassess={commonStyles.smallVerticalPadding}>
                <div className={styles.summaryCard}>
                    {/* Close Button X */}
                    <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
                        <img src={CloseIcon} alt="Close" />
                    </button>

                    {/* Loop over course modules */}
                    {course?.modules?.map((mod, mIdx) => (
                        <div key={`module-${mod.moduleNumber ?? mIdx}`} className={styles.moduleSection}>
                            <h2 className={styles.moduleTitle}>
                                {mod.moduleNameTranslation ? t(mod.moduleNameTranslation) : `Module ${mod.moduleNumber ?? mIdx + 1}`}
                            </h2>

                            {/* Loop over module questions */}
                            {mod.questions?.map((q, qIdx) => {
                                // Skip content questions (maxPoints === 0)
                                if (q.maxPoints === 0) return null;

                                const questionKey = `m${mod.moduleNumber ?? mIdx}_q${q.questionNumber ?? qIdx}`;
                                const isShowingAnswer = !!showAnswersMap[questionKey];
                                const qScore = getQuestionScore(mod.moduleNumber, q.questionNumber ?? qIdx);
                                const isAnswerCorrect = (qScore?.points ?? 0) > 0;

                                return (
                                    <div key={questionKey} className={styles.questionItem}>
                                        <QuestionRenderer
                                            question={q}
                                            showAnswer={isShowingAnswer}
                                            playerResponse={qScore?.response}
                                            isAnswerCorrect={isAnswerCorrect}
                                        />

                                        {/* Toggle switch for showing answers */}
                                        <div className={styles.toggleWrapper}>
                                            {isShowingAnswer && (
                                                <div className={styles.feedbackIcon}>
                                                    <img
                                                        src={isAnswerCorrect ? FeedbackCorrect : FeedbackIncorrect}
                                                        alt={isAnswerCorrect ? "Correct" : "Incorrect"}
                                                    />
                                                </div>
                                            )}
                                            <ToggleSwitch
                                                value={isShowingAnswer}
                                                onToggle={() => toggleShowAnswer(questionKey)}
                                                label={t("course.results.show.answers.button")}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </PrimaryContainer>
        </PageContainer>
    );
};

export default CourseSummary;
