import { Request, Response, Router } from 'express';
import { appResponse, appRoute } from '../shared/route';
import { security } from '../shared/security';
import * as ErrorsAdapter from '../core/errorAdapter';
import { materialService } from '../services';

async function get(req: Request, res: Response) {
    const materials = await materialService.DB.Get.all();

    if (!materials) throw ErrorsAdapter.Global.createError(ErrorsAdapter.Global.ErrorsEnum.ASSET_NOT_FOUND);

    appResponse.prepareJsonResponse(res, materials);
}

export default function setup(router: Router) {
    router.get(appRoute.getMap().materials.get, security.validateAuthenticatedRequest, get);
}
