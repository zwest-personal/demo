import {JSend} from "@src/common/jsend/jsend";
import {JSONCodec} from "nats";

class Response implements JSend {
    private codec = JSONCodec()

    // https://github.com/omniti-labs/jsend
    public success(data: any): Uint8Array {
        return this.codec.encode({
            status: 'success',
            data,
        });
    }

    public fail(data: any): Uint8Array {
        return this.codec.encode({
            status: 'fail',
            data,
        });
    }

    public error(message: string | null, data?: any): Uint8Array {
        return this.codec.encode({
            status: 'error',
            message,
            data,
        });
    }
}

export const NatsResponse = new Response()