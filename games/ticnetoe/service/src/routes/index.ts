import { Router } from 'express';

import Paths from '@src/common/paths';
import DebugRouter from '@src/routes/debug';

/**
 * Set up REST routes
 */

const routes = Router();
routes.use(Paths.Debug.Base, DebugRouter);
// routes.use(Paths.SomeOtherResource.Base, SomeOtherRouter)

export default routes;
