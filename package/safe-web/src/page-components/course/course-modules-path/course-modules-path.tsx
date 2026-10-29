import React from "react";
import { useTranslate } from "@tolgee/react";
import type { ICourse } from "../../../types/course";
import { COURSE_SECTIONS_CONFIG } from "../../../helpers/constants/course";

import styles from "./course-modules-path.module.scss";

import Module1Icon from "../../../assets/courses/modules/module1.svg";
import Module2Icon from "../../../assets/courses/modules/module2.svg";
import Module3Icon from "../../../assets/courses/modules/module3.svg";
import Module4Icon from "../../../assets/courses/modules/module4.svg";
import Module5Icon from "../../../assets/courses/modules/module5.svg";
import Module6Icon from "../../../assets/courses/modules/module6.svg";
import Module7Icon from "../../../assets/courses/modules/module7.svg";

const MODULE_ICONS = [
    Module1Icon,
    Module2Icon,
    Module3Icon,
    Module4Icon,
    Module5Icon,
    Module6Icon,
    Module7Icon,
];

interface CourseModulesPathProps {
    course?: ICourse | null;
    onSelectSection?: (sectionIndex: number) => void;
}

const CourseModulesPath: React.FC<CourseModulesPathProps> = ({
    course,
    onSelectSection,
}) => {
    const { t } = useTranslate();

    const sectionNodes = COURSE_SECTIONS_CONFIG.map((config, idx) => {
        const customTitle = course?.modules?.[idx]?.moduleNameTranslation;
        const label = customTitle ? t(customTitle) : t(config.translationKey, config.defaultTitle);

        return {
            id: idx,
            icon: MODULE_ICONS[idx % MODULE_ICONS.length],
            label,
        };
    });

    const firstRow = sectionNodes.slice(0, 4);
    const secondRow = sectionNodes.slice(4, 7);

    const renderNode = (node: (typeof sectionNodes)[0]) => (
        <div
            key={`node-${node.id}`}
            className={styles.nodeItem}
            onClick={() => onSelectSection && onSelectSection(node.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    onSelectSection && onSelectSection(node.id);
                }
            }}
        >
            <div className={styles.hexagonWrapper}>
                <svg
                    className={styles.hexagonSvg}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id={`hexFill-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(231, 231, 231, 0.24)" />
                            <stop offset="100%" stopColor="rgba(231, 231, 231, 0.16)" />
                        </linearGradient>
                        <linearGradient id={`hexStroke-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
                            <stop offset="50%" stopColor="rgba(210, 210, 210, 0.35)" />
                            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.55)" />
                        </linearGradient>
                    </defs>
                    <polygon
                        points="50,3 97,25 97,75 50,97 3,75 3,25"
                        fill={`url(#hexFill-${node.id})`}
                        stroke={`url(#hexStroke-${node.id})`}
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className={styles.iconContainer}>
                    <img
                        src={node.icon}
                        alt={`Module Section ${node.id + 1}`}
                        className={styles.icon}
                    />
                </div>
            </div>
            <p className={styles.nodeLabel}>{node.label}</p>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.modulesRowTop}>{firstRow.map(renderNode)}</div>
            <div className={styles.modulesRowBottom}>{secondRow.map(renderNode)}</div>
        </div>
    );
};

export default CourseModulesPath;
