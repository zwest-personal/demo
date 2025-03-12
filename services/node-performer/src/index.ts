import logger from 'jet-logger';

import Config from '@src/common/config';
import server from './server';


/******************************************************************************
                                  Run
******************************************************************************/

const SERVER_START_MSG = ('Express server started on port: ' + 
  Config.ServerPort.toString());

server.listen(Config.ServerPort, () => logger.info(SERVER_START_MSG));
