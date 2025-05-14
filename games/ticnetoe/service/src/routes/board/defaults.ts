import HttpStatusCodes from 'http-status-codes';
import { HTTPResponse } from '@src/helpers/jsend/http';
import {IReq, IRes} from '../common';

/**
 * Return our default Board configuration
 * @param _
 * @param res
 */
function defaults(_: IReq, res: IRes) {
  // TODO Pull from config
  const boardDefaults = {
    board: {
      minBoardSize: 6,
      maxBoardSize: 60,
      minWinningSize: 3,
      maxWinningSize: 30,
    },
  };
  res.status(HttpStatusCodes.OK).json(HTTPResponse.success(boardDefaults));
}

export default defaults;
