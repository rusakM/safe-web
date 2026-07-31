import { dbConnector } from '../core';

import * as model from '../models/PlayerCourse';
import { Logger } from './logger.service';
export import Model = model;
import { courseService } from '.';
import { ConstantsCourse } from '../core/constants';
import * as ErrorsAdapter from '../core/errorAdapter';

const logger = new Logger('/services/playerCourse.service');

class dbConnectorPlayerCourse extends dbConnector<Model.IDBPlayerCourse, Model.IPlayerCourse, Model.TIndexes> {
    constructor() {
        super(Model.PlayerCourse);
    }
}

export const DB = new dbConnectorPlayerCourse();

const contentQuestionChecker = () => true;
const basicQuestionChecker = (answer: string, correctAnswer: string) => answer === correctAnswer;

const checkAnswersFunctions: { [key in ConstantsCourse.Question.TYPES_ENUM]: (answer: string, correctAnswer: string) => boolean } = {
    [ConstantsCourse.Question.TYPES_ENUM.CONTENT_TEXT]: contentQuestionChecker,
    [ConstantsCourse.Question.TYPES_ENUM.CONTENT_VIDEO]: contentQuestionChecker,
    [ConstantsCourse.Question.TYPES_ENUM.FIT_TILES]: (answer: string, correctAnswer: string) => {
        if (answer?.length !== correctAnswer?.length) return false;
        const ansArr = JSON.parse(answer) as Array<Array<number>>;
        const corrAnsArr = JSON.parse(correctAnswer) as Array<Array<number>>;
        const normalizeAnswers = (answers: Array<Array<number>>): Array<Array<number>> => {
            return answers.map((pair) => [...pair].sort((a, b) => a - b));
        };

        const normalizedUser = normalizeAnswers(ansArr);
        const normalizedCorrect = normalizeAnswers(corrAnsArr);

        const sortPairs = (pairs: Array<Array<number>>): Array<Array<number>> => {
            return pairs.sort((a, b) => {
                if (a[0] !== b[0]) return a[0] - b[0];
                return a[1] - b[1];
            });
        };

        const sortedCorrect = sortPairs(normalizedCorrect);
        const sortedUser = sortPairs(normalizedUser);

        return JSON.stringify(sortedCorrect) === JSON.stringify(sortedUser);
    },
    [ConstantsCourse.Question.TYPES_ENUM.MULTI_CHOOSE]: (answer: string, correctAnswer: string) => {
        const ansArr = JSON.parse(answer) as Array<Array<number>>;
        const corrAnsArr = JSON.parse(correctAnswer) as Array<Array<number>>;
        if (corrAnsArr.length !== ansArr.length) return false;
        console.log(ansArr, corrAnsArr);
        if (!ansArr?.length) return false;
        for (let i = 0; i < ansArr.length; i++) {
            if (!corrAnsArr.includes(ansArr[i])) return false;
        }
        return true;
    },
    [ConstantsCourse.Question.TYPES_ENUM.SELECT_CORRECT_ANSWER]: basicQuestionChecker,
    [ConstantsCourse.Question.TYPES_ENUM.SINGLE_CHOOSE]: basicQuestionChecker,
    [ConstantsCourse.Question.TYPES_ENUM.TRUE_FALSE]: basicQuestionChecker,
};

export namespace Helpers {
    export async function createPlayerCourse(courseId: string, playerId: string): Promise<model.IPlayerCourse> {
        try {
            const playerCourse = await DB.Find.byMultipleKeys({ courseId, playerId });
            if (playerCourse.length) return playerCourse[0];
            const course = await courseService.DB.Find.byId(courseId);
            if (!course) throw ErrorsAdapter.Course.createError(ErrorsAdapter.Course.ErrorsEnum.COURSE_NOT_FOUND);

            return await DB.create({
                courseId,
                isFinished: false,
                modulesStats: course.modules.map((mod) => ({
                    module: mod.moduleNumber,
                    status: ConstantsCourse.Module.STATUS_ENUM.NOT_STARTED,
                })),
                playerId,
                questionScores: [],
                score: 0,
            });
        } catch (error) {
            logger.error('Unable to create player course', error);
            return null;
        }
    }

    export async function processAnswer(answerDTO: model.ProcessAnswerDTO): Promise<model.IPlayerCourse> {
        try {
            const course = await courseService.DB.Find.byId(answerDTO.courseId);
            if (!course) throw ErrorsAdapter.Course.createError(ErrorsAdapter.Course.ErrorsEnum.COURSE_NOT_FOUND);
            let playerCourse: model.IPlayerCourse;
            if (!answerDTO.playerCourseId) playerCourse = await createPlayerCourse(answerDTO.courseId, answerDTO.playerId);
            else playerCourse = await DB.Find.byId(answerDTO.playerCourseId);

            if (!playerCourse) playerCourse = await createPlayerCourse(answerDTO.courseId, answerDTO.playerId);
            if (!playerCourse) throw ErrorsAdapter.Course.createError(ErrorsAdapter.Course.ErrorsEnum.PLAYER_COURSE_NOT_FOUND);

            // 1. moduł i pytanie z definicji kursu
            const module = course.modules?.[answerDTO.moduleId];
            if (!module) throw ErrorsAdapter.Course.createError(ErrorsAdapter.Course.ErrorsEnum.MODULE_NOT_FOUND);

            const question = module.questions?.[answerDTO.questionId];
            if (!question) throw ErrorsAdapter.Course.createError(ErrorsAdapter.Course.ErrorsEnum.QUESTION_NOT_FOUND);

            const moduleNumber = answerDTO.moduleId + 1;

            // 2. sprawdzenie odpowiedzi i punktacja
            const isCorrect = question.type ? checkAnswersFunctions[question.type](answerDTO.response, question.correctAnswer) : false;
            const points = isCorrect ? (question.maxPoints ?? 0) : 0;

            const questionScores = [...(playerCourse.questionScores ?? [])];
            const existingScoreIndex = questionScores.findIndex((qs) => qs.module === moduleNumber && qs.question === answerDTO.questionId);
            const previousPoints = existingScoreIndex >= 0 ? (questionScores[existingScoreIndex].points ?? 0) : 0;

            const questionScoreEntry: model.IQuestionScore = {
                correctAnswer: question.correctAnswer,
                module: moduleNumber,
                points,
                question: answerDTO.questionId,
                respondAt: answerDTO.respondAt,
                response: answerDTO.response,
            };

            if (existingScoreIndex >= 0) {
                questionScores[existingScoreIndex] = questionScoreEntry;
            } else {
                questionScores.push(questionScoreEntry);
            }

            // 3. status modułu (PENDING po pierwszej odpowiedzi, COMPLETED po ostatniej)
            const modulesStats = (playerCourse.modulesStats ?? []).map((stat) => ({ ...stat }));
            const moduleStatIndex = modulesStats.findIndex((stat) => stat.module === moduleNumber);

            const answeredQuestionsInModule = questionScores.filter((qs) => qs.module === moduleNumber).length;
            const totalQuestionsInModule = module.questions?.length ?? 0;
            const moduleStatus = answeredQuestionsInModule >= totalQuestionsInModule ? ConstantsCourse.Module.STATUS_ENUM.COMPLETED : ConstantsCourse.Module.STATUS_ENUM.PENDING;

            if (moduleStatIndex >= 0) {
                modulesStats[moduleStatIndex].status = moduleStatus;
            } else {
                modulesStats.push({ module: moduleNumber, status: moduleStatus });
            }

            // 4. globalny wynik i ukończenie kursu
            const score = (playerCourse.score ?? 0) - previousPoints + points;
            const isFinished = modulesStats.length > 0 && modulesStats.every((stat) => stat.status === ConstantsCourse.Module.STATUS_ENUM.COMPLETED);

            const playerCourseUpdate: model.IPlayerCourse = {
                isFinished,
                modulesStats,
                questionScores,
                score,
            };

            return await DB.update(playerCourse._id, playerCourseUpdate);
        } catch (error) {
            logger.error('Error processing answer', error);
            return null;
        }
    }
}
