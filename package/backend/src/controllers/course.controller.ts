import { Request, Response, Router } from 'express';
import { appResponse, appRoute } from '../shared/route';
import { security } from '../shared/security';
import * as ErrorsAdapter from '../core/errorAdapter';
import { courseService, loggerService, playerCourseService } from '../services';
import { validateSendAnswer } from '../middlewares/validators/course';
import { useRequestTime } from '../middlewares/requestTime';

async function getCourse(req: Request, res: Response) {
    const courseId = req.params.courseId?.toString();
    const course = await courseService.DB.Find.byId(courseId);

    if (!course) return appResponse.prepareErrorResponse(res, ErrorsAdapter.Global.createError(ErrorsAdapter.Global.ErrorsEnum.ASSET_NOT_FOUND));
    return appResponse.prepareJsonResponse(res, course);
}

async function getCoursesStats(req: Request, res: Response) {
    const userId = req.params.userId?.toString();
    let courses = (await playerCourseService.DB.Find.byIndex('playerId', userId)) ?? [];
    if (courses?.length)
        courses = courses.map(({ courseId, isFinished }) => ({
            courseId,
            isFinished,
        }));

    return appResponse.prepareJsonResponse(res, courses);
}

async function getPlayerCourse(req: Request, res: Response) {
    const courseId = req.params.courseId?.toString();
    const userId = req.params.userId?.toString();

    if (!courseId) return appResponse.prepareErrorResponse(res, ErrorsAdapter.Global.createError(ErrorsAdapter.Global.ErrorsEnum.ASSET_NOT_FOUND));
    let playerCourse = (await playerCourseService.DB.Find.byMultipleKeys({ playerId: userId, courseId }))?.[0];
    if (!playerCourse) playerCourse = await playerCourseService.Helpers.createPlayerCourse(courseId, userId);
    return appResponse.prepareJsonResponse(res, playerCourse);
}

async function sendAnswer(req: Request, res: Response) {
    const courseId = req.params.courseId?.toString();
    const userId = req.params.userId?.toString();
    const requestTime = req.params.requestTime?.toString();
    if (!courseId) return appResponse.prepareErrorResponse(res, ErrorsAdapter.Global.createError(ErrorsAdapter.Global.ErrorsEnum.ASSET_NOT_FOUND));
    const { moduleId, playerCourseId, questionId, response } = req.body as playerCourseService.Model.ProcessAnswerDTO;
    const answer = await playerCourseService.Helpers.processAnswer({
        courseId,
        moduleId,
        playerCourseId,
        playerId: userId,
        questionId,
        respondAt: requestTime ?? new Date().toISOString(),
        response,
    });
    return appResponse.prepareJsonResponse(res, answer);
}

export default function setup(router: Router) {
    router.get(appRoute.getMap().course.getPlayerStats, security.validateAuthenticatedRequest, getCoursesStats);

    router.get(appRoute.getMap().course.get, security.validateAuthenticatedRequest, getCourse);

    router.get(appRoute.getMap().course.getPlayerCourse, security.validateAuthenticatedRequest, getPlayerCourse);

    router.post(appRoute.getMap().course.sendAnswer, security.validateAuthenticatedRequest, useRequestTime, validateSendAnswer, sendAnswer);
}
