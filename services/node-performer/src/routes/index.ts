import { Router } from 'express';

import Paths from '@src/common/paths';
import DebugRouter from '@src/routes/debug';

/**
 * Set up REST routes
 *
 * In a larger service I would break out the various into individual files/folders.
 * So instead of putting a route here you'd define it
 */

const routes = Router();
routes.use(Paths.Debug.Base, DebugRouter)
// routes.use(Paths.SomeOtherResource.Base, SomeOtherRouter)

export default routes;
