import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import * as errorAdapter from '../../core/errorAdapter';

export const validateSendAnswer = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        moduleId: Joi.number().min(0).required(),
        playerCourseService: Joi.string().optional(),
        questionId: Joi.number().min(0),
        response: Joi.string().allow(null, '').optional(),
    });

    const error: Joi.ValidationError = schema.validate(req.body).error;
    if (error) throw errorAdapter.Core.createError(errorAdapter.Core.ErrorsEnum.VALIDATION_ERROR, { entity: 'Send answer', details: error.details });

    return next();
};
