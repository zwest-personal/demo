import {Nats as NatsHelper} from "@src/util/nats";
import Config from "@src/common/config";

import Ready from "./ready"

const Nats = new NatsHelper(Config.ServiceName)

// Could also 'send' the ready file the Nats connection and have it initialize,
// or have the Ready function return all needed values as a function

export async function subscribeAll() {
    Nats.subscribe(Ready.subject, Ready.handler, Ready.queue)
}
