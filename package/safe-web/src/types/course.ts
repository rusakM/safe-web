import { constantsCourse } from "../helpers/constants";
export interface IQuestionMedia {
    name?: string;
    url?: string;
    type?: constantsCourse.QUESTION_MEDIA_TYPES_ENUM;
}

export interface IQuestion {
    answers?: string[];
    correctAnswer?: string;
    correctAnswerIndex?: number;
    description?: string;
    maxPoints?: number;
    media?: IQuestionMedia[];
    question?: string;
    questionNumber?: number;
    type?: constantsCourse.TYPES_ENUM;
}

export interface IModule {
    questions?: IQuestion[];
    moduleNumber?: number;
    moduleNameTranslation?: string;
}

export interface IBibliography {
    title?: string;
    url?: string;
}

export interface ICourseListItem {
    _id: string;
    courseNumber: number;
}

export interface ICourse {
    _id?: string;
    bibliography?: IBibliography[];
    courseNumber?: number;
    modules?: IModule[];
    name?: string;
    nameTranslation?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IQuestionScore {
    correctAnswer?: string;
    module?: number;
    points?: number;
    question?: number;
    respondAt?: string;
    response?: string;
}

export interface IModuleStats {
    module?: number;
    status?: string;
}

export interface IPlayerCourse {
    _id?: string;
    isFinished?: boolean;
    courseId?: string;
    modulesStats?: IModuleStats[];
    playerId?: string;
    questionScores?: IQuestionScore[];
    score?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICourseStats {
    courseId: string;
    isFinished: boolean;
}

export interface ISendAnswerPayload {
    courseId: string;
    moduleId: number;
    questionId?: number;
    response?: string;
    playerCourseId?: string;
}
