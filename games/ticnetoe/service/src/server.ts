import ApiRouter from '@src/routes';
import HttpStatusCodes from 'http-status-codes';
import {RouteError} from '@src/helpers/route-errors';
import {HTTPResponse} from '@src/helpers/jsend/http';

import express, {Request, Response, NextFunction} from 'express';
import Paths from '@src/common/paths';
import logger from '@src/common/logger';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json(HTTPResponse.error(err.message));
  }
  return next(err);
});

app.use(Paths.Base, ApiRouter);

app.get(Paths.Base, (req, res) => {
  res.send('TicNEToe API Root');
});

app.use(Paths.Base, ApiRouter);

app.listen(port, '0.0.0.0', () => {
  logger.info(`TicNEToe service listening on port ${port}`);
});
