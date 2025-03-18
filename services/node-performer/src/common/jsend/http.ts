import {JSend} from "@src/common/jsend/jsend";

export interface ApiResponse {
    status: 'success' | 'fail' | 'error';
    data?: any;
    message?: any;
}

class Response implements JSend {
    // https://github.com/omniti-labs/jsend
    public success(data: any): ApiResponse {
        return {
            status: 'success',
            data,
        };
    }

    public fail(data: any): ApiResponse {
        return {
            status: 'fail',
            data,
        };
    }

    public error(message: string | null, data?: any): ApiResponse {
        return {
            status: 'error',
            message,
            data,
        };
    }
}

export const HTTPResponse = new Response()