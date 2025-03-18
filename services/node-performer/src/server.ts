import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, {Request, Response, NextFunction} from 'express';
import logger from 'jet-logger';
import WebSocket, {WebSocketServer} from 'ws';

import 'express-async-errors';

import BaseRouter from '@src/routes';

import Paths from '@src/common/paths';
import Config from '@src/common/config';
import {RouteError} from '@src/common/route-errors';
import {NodeEnvs} from '@src/common/constants';
import {jsend} from "@src/common/jsend";
import websocket from '@src/websocket';
import HttpStatusCodes from "http-status-codes";

const app = express();

// TODO Move middleware out into its own folder rather than piling it up in here

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
        status = err.status;
        res.status(status).json(jsend.error(err.message));
    }
    return next(err);
});

websocket(app);

export default app;
