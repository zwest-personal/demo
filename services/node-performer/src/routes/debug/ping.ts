import HttpStatusCodes from 'http-status-codes';
import {jsend} from "@src/common/jsend";
import {IReq, IRes} from '../common';

/**
 * Ping simple returns back a 200 'Okay'
 * @param _
 * @param res
 */
async function ping(_: IReq, res: IRes) {
    res.status(HttpStatusCodes.OK).json(jsend.success({ping: 'pong'}));
}

export default ping;
