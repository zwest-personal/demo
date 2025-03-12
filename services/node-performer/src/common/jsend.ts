/**
 * JSend is a simple spec for JSON responses
 *
 * I've found it a pretty handy spec to adhere to - it's not complicated, very light
 * and offers consistency where it matters.
 */

export interface ApiResponse {
    status: 'success' | 'fail' | 'error';
    data?: any;
    message?: any;
}

export class jsend {
    // https://github.com/omniti-labs/jsend
    public static success(data: any): ApiResponse {
        return {
            status: 'success',
            data,
        };
    }

    public static fail(data: any): ApiResponse {
        return {
            status: 'fail',
            data,
        };
    }

    public static error(message: string | null, data?: any): ApiResponse {
        return {
            status: 'error',
            message,
            data,
        };
    }
}
