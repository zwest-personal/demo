import { Router } from 'express';

import Paths from '@src/common/paths';
import DebugRouter from '@src/routes/debug';
import BoardRouter from '@src/routes/board';

/**
 * Set up REST routes
 */
const routes = Router();
routes.use(Paths.Debug.Base, DebugRouter);
routes.use(Paths.Board.Base, BoardRouter);

export default routes;
