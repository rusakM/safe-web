export enum TYPES_ENUM {
        CONTENT_TEXT = 'CONTENT_TEXT',
        CONTENT_VIDEO = 'CONTENT_VIDEO',
        FIT_TILES = 'FIT_TILES',
        MULTI_CHOOSE = 'MULTI_CHOOSE',
        SELECT_CORRECT_ANSWER = 'SELECT_CORRECT_ANSWER',
        SINGLE_CHOOSE = 'SINGLE_CHOOSE',
        TRUE_FALSE = 'TRUE_FALSE',
    }

export const PLAYABLE_QUESTION_TYPES: TYPES_ENUM[] = [
    TYPES_ENUM.FIT_TILES, 
    TYPES_ENUM.MULTI_CHOOSE, 
    TYPES_ENUM.SELECT_CORRECT_ANSWER, 
    TYPES_ENUM.SINGLE_CHOOSE, 
    TYPES_ENUM.TRUE_FALSE
];

export enum QUESTION_MEDIA_TYPES_ENUM {
    PHOTO = 'PHOTO',
    VIDEO = 'VIDEO',
}

export enum STAGE_ENUM {
    INTRODUCTION = 'INTRODUCTION',
    INTRODUCTION_QUESTIONS = 'INTRODUCTION_QUESTIONS',
    THEORETICAL_PART = 'THEORETICAL_PART',
    CASE_STUDIES = 'CASE_STUDIES',
    INTERACTIVE_QUESTIONS = 'INTERACTIVE_QUESTIONS',
    SUMMARIZE_QUESTIONS = 'SUMMARIZE_QUESTIONS',
    SUMMARIZE_MODULE = 'SUMMARIZE_MODULE',
}

export interface ICourseSectionConfig {
    id: number;
    stage: STAGE_ENUM;
    translationKey: string;
    defaultTitle: string;
}

export const COURSE_SECTIONS_CONFIG: ICourseSectionConfig[] = [
    {
        id: 0,
        stage: STAGE_ENUM.INTRODUCTION,
        translationKey: 'active.course.hub.module.title.1',
        defaultTitle: 'Wstęp',
    },
    {
        id: 1,
        stage: STAGE_ENUM.INTRODUCTION_QUESTIONS,
        translationKey: 'active.course.hub.module.title.2',
        defaultTitle: 'Pytania\nwstępne',
    },
    {
        id: 2,
        stage: STAGE_ENUM.THEORETICAL_PART,
        translationKey: 'active.course.hub.module.title.3',
        defaultTitle: 'Część\nteoretyczna',
    },
    {
        id: 3,
        stage: STAGE_ENUM.CASE_STUDIES,
        translationKey: 'active.course.hub.module.title.4',
        defaultTitle: 'Studia\nprzypadku',
    },
    {
        id: 4,
        stage: STAGE_ENUM.INTERACTIVE_QUESTIONS,
        translationKey: 'active.course.hub.module.title.5',
        defaultTitle: 'Interaktywne\nzadania',
    },
    {
        id: 5,
        stage: STAGE_ENUM.SUMMARIZE_QUESTIONS,
        translationKey: 'active.course.hub.module.title.6',
        defaultTitle: 'Pytania\npodsumowujące',
    },
    {
        id: 6,
        stage: STAGE_ENUM.SUMMARIZE_MODULE,
        translationKey: 'active.course.hub.module.title.7',
        defaultTitle: 'Podsumowanie\nmodułu',
    },
];
