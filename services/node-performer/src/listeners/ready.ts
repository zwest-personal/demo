import {Msg, NatsError} from "nats";
import {NatsResponse} from "@src/common/jsend/nats";
import Subjects from "@src/common/subjects";

/**
 * Ready listener that when asked via Nats will reply that it is up and good to go
 *
 * @param err NatsError Nats error wrapper
 * @param msg Msg Nats message
 */
async function ready(err: NatsError | null, msg: Msg) {
    msg.respond(NatsResponse.success({ping: 'pong'}));
}

export default {
    subject: Subjects.Ready,
    handler: ready,
    queue: true,
};
