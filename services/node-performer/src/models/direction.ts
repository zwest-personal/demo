import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';

// IDirection is the interface for a single 'direction' from the composer
// The node-performer only cares to ensure that these messages align with what it expects
export interface IDirection {
    type: string;
    output: string;
}

/**
 * newDirection instantiates a new Direction object which can then be acted upon by the service
 */
function newDirection(direction?: Partial<IDirection>): IDirection {
    const retVal = { ...direction };
    return parseDirection(retVal, errors => {
        throw new Error('Setup new direction failed ' + JSON.stringify(errors, null, 2));
    });
}

/**
 * validate checks that the Direction aligns with the expected definition
 */
function testDirection(arg: unknown, errCb?: TParseOnError): arg is IDirection {
    return !!parseDirection(arg, errCb);
}

/**
 * parseDirection parses a Direction definition
 */
const parseDirection = parseObject<IDirection>({
    type: isString,
    output: isString,
});


export default {
    new: newDirection,
    test: testDirection,
} as const;