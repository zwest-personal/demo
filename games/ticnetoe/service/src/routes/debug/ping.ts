import HttpStatusCodes from 'http-status-codes';
import { HTTPResponse } from '@src/helpers/jsend/http';
import {IReq, IRes} from '../common';

/**
 * Ping simple returns back a 200 'Okay'
 * @param _
 * @param res
 */
function ping(_: IReq, res: IRes) {
  res.status(HttpStatusCodes.OK).json(HTTPResponse.success({ping: 'pong'}));
}

export default ping;
