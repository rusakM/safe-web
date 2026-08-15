import React from "react";
import { useTranslate } from "@tolgee/react";
import type { ICourse } from "../../../types/course";

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

const DEFAULT_SECTION_KEYS = [
    "active.course.hub.module.title.1",
    "active.course.hub.module.title.2",
    "active.course.hub.module.title.3",
    "active.course.hub.module.title.4",
    "active.course.hub.module.title.5",
    "active.course.hub.module.title.6",
    "active.course.hub.module.title.7",
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

    const sectionNodes = Array.from({ length: 7 }, (_, idx) => 
        ({
            id: idx,
            icon: MODULE_ICONS[idx % MODULE_ICONS.length],
            translationKey: course?.modules?.[idx]?.moduleNameTranslation ?? DEFAULT_SECTION_KEYS[idx]
        })
    );

    const firstRow = sectionNodes.slice(0, 4);
    const secondRow = sectionNodes.slice(4, 7);

    const renderNode = (node: (typeof sectionNodes)[0]) => (
        <div
            key={`node-${node.id}`}
            className={styles.nodeItem}
            onClick={() => onSelectSection && onSelectSection(node.id)}
        >
            <div className={styles.hexagonWrapper}>
                <img src={node.icon} alt={`Module Section ${node.id + 1}`} className={styles.icon} />
            </div>
            <p className={styles.nodeLabel}>{t(node.translationKey)}</p>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.modulesRow}>{firstRow.map(renderNode)}</div>
            <div className={styles.modulesRow}>{secondRow.map(renderNode)}</div>
        </div>
    );
};

export default CourseModulesPath;
