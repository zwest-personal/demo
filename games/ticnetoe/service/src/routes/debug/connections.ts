import HttpStatusCodes from 'http-status-codes';
import { HTTPResponse } from '@src/common/jsend/http';
import {IReq, IRes} from '../common';

/**
 * Connections debug route outputs all active connections/games
 *
 * @param _
 * @param res
 */
async function ping(_: IReq, res: IRes) {
  res.status(HttpStatusCodes.OK).json(HTTPResponse.success({ping: 'pong'}));
}

export default ping;
