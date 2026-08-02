import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PrimaryContainer from "../../components/primary-container/primary-container";
import CourseHeader from "../../components/course-header/course-header";
import CourseModulesPath from "../../page-components/course/course-modules-path/course-modules-path";
import CourseBibliography from "../../page-components/course/course-bibliography/course-bibliography";
import QuestionRenderer from "../../page-components/questions";

import {
    selectCurrentCourse,
    selectPlayerCourse,
} from "../../redux/course/course.selectors";
import {
    fetchCourseStart,
    fetchPlayerCourseStart,
} from "../../redux/course/course.actions";

import styles from "./course.module.scss";

export type TCourseViewMode = "modules" | "bibliography" | "question";

interface CourseProps {
    children?: React.ReactNode;
    overrideViewMode?: TCourseViewMode;
}

const Course: React.FC<CourseProps> = ({ children, overrideViewMode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams<{ courseId: string }>();

    const course = useSelector(selectCurrentCourse);
    const playerCourse = useSelector(selectPlayerCourse);

    const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
    const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
    const [viewMode, setViewMode] = useState<TCourseViewMode>(overrideViewMode || "modules");

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

    const handleGoBack = useCallback(() => {
        if (viewMode === "bibliography") {
            setViewMode("modules");
            return;
        }
        if (activeSectionIndex > 0) {
            setActiveSectionIndex((prev) => prev - 1);
        } else if (activeModuleIndex > 0) {
            setActiveModuleIndex((prev) => prev - 1);
            setActiveSectionIndex(0);
        } else {
            navigate("/courses");
        }
    }, [viewMode, activeSectionIndex, activeModuleIndex, navigate]);

    const handleGoNext = useCallback(() => {
        if (viewMode === "bibliography") {
            setViewMode("modules");
            return;
        }
        if (activeSectionIndex < 6) {
            setActiveSectionIndex((prev) => prev + 1);
            setViewMode("question");
        } else {
            const totalModules = course?.modules?.length || 1;
            if (activeModuleIndex < totalModules - 1) {
                setActiveModuleIndex((prev) => prev + 1);
                setActiveSectionIndex(0);
                setViewMode("modules");
            } else {
                navigate("/courses");
            }
        }
    }, [viewMode, activeSectionIndex, activeModuleIndex, course?.modules?.length, navigate]);

    const handleOpenBibliography = useCallback(() => {
        setViewMode("bibliography");
    }, []);

    const handleSelectSection = useCallback((sectionIndex: number) => {
        setActiveSectionIndex(sectionIndex);
        setViewMode("question");
    }, []);

    const currentQuestion = course?.modules?.[activeModuleIndex]?.questions?.[activeSectionIndex];

    const renderContent = () => {
        if (children) {
            return children;
        }

        switch (viewMode) {
            case "bibliography":
                return <CourseBibliography bibliography={course?.bibliography} />;

            case "question":
                if (currentQuestion) {
                    return (
                        <QuestionRenderer
                            question={currentQuestion}
                            showAnswer={false}
                        />
                    );
                }
                return (
                    <CourseModulesPath
                        course={course}
                        onSelectSection={handleSelectSection}
                    />
                );

            case "modules":
            default:
                return (
                    <CourseModulesPath
                        course={course}
                        onSelectSection={handleSelectSection}
                    />
                );
        }
    };

    return (
        <div className={styles.presenterWrapper}>
            <CourseHeader
                module={activeModuleIndex + 1}
                section={activeSectionIndex + 1}
                goBack={handleGoBack}
                goNext={handleGoNext}
                openBibliography={handleOpenBibliography}
                showBibliography={viewMode === "bibliography"}
            />
            <PrimaryContainer direction="column" additionalClassess={styles.contentContainer}>
                {renderContent()}
            </PrimaryContainer>
        </div>
    );
};

export default Course;