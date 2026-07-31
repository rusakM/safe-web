import { IRouter, Router } from 'express';

import setupCourse from './course.controller';
import setupMaterials from './materials.controller';
import setupUserAuth from './userAuth.controller';

const router: IRouter = Router();

setupCourse(router);
setupMaterials(router);
setupUserAuth(router);

export default router;
