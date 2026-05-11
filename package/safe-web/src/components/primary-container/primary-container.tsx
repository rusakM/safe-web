import React, {type ReactNode } from 'react';
import styles from './primary-container.module.scss';

export type TContainersDirection = 'row' | 'rowReverse' | 'column' | 'columnReverse';
export type TAlignment = 'center' | 'left' | 'right';
interface PrimaryContainerProps {
    children: ReactNode;
    height?: 'allScreenHeight' | 'auto';
    contentAlignment?: TAlignment;
    contentJustify?: TAlignment;
    direction?: TContainersDirection;
    additionalClassess?: string;
    width?: 'all' | 'desktopFit';
}

const PrimaryContainer: React.FC<PrimaryContainerProps> = ({ children, contentAlignment = 'center', contentJustify = 'center', height = 'auto', direction = 'row', additionalClassess, width = 'all' }) => {
    return <div className={`${styles.container} ${(height === 'allScreenHeight' && styles.allScreenHeight) || ''} ${styles[direction]} ${styles[contentAlignment]} ${styles[`justify${contentJustify}`]} ${additionalClassess || ''}${width === 'desktopFit' ? ` ${styles.desktopFit}` : ''}`}>{children}</div>;
};

export default PrimaryContainer;
