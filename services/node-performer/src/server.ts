import express, {Request, Response, NextFunction} from 'express';

import 'express-async-errors';

import ApiRouter from '@src/routes';

import Paths from '@src/common/paths';
import {RouteError} from '@src/common/route-errors';
import {HTTPResponse} from "@src/common/jsend/http";
import websocket from '@src/websocket';
import HttpStatusCodes from "http-status-codes";
import {subscribeAll} from "@src/listeners";

const app = express();

// TODO Move middleware out into its own folder rather than piling it up in here

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
        status = err.status;
        res.status(status).json(HTTPResponse.error(err.message));
    }
    return next(err);
});

// Set up websocket for express
websocket(app);

// Add HTTP Routes
app.use(Paths.Base, ApiRouter);

// Initialize Nats listeners
// TODO This 'server' file is mostly for HTTP endpoints, Nats listeners not totally suitable here. Move?
subscribeAll();

export default app;
