import { IParseObjectError } from 'jet-validators/utils';
import HttpStatusCodes from 'http-status-codes';


/******************************************************************************
                                 Classes
******************************************************************************/

/**
 * Error with status code and message.
 */
export class RouteError extends Error {
  public status: number;

  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * Handle "parseObj" errors.
 */
export class ValidationError extends RouteError {

  public static MESSAGE = 'The parseObj() function discovered one or ' + 
    'more errors.';

  public constructor(errors: IParseObjectError[]) {
    const msg = JSON.stringify({
      message: ValidationError.MESSAGE,
      errors,
    });
    super(HttpStatusCodes.BAD_REQUEST, msg);
  }
}
