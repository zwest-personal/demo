import { Router } from 'express';
import Paths from '@src/common/paths';
import defaults from '@src/routes/board/defaults';

// Set up routes
const boardRouter = Router();
boardRouter.get(Paths.Board.Defaults, defaults);

export default boardRouter;
