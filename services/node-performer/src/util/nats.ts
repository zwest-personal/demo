import { wsconnect, deferred, nuid} from "@nats-io/nats-core";
import type { NatsConnection } from "@nats-io/nats-core";
import Config from '@src/common/config';

export class nats {
    public nc!: NatsConnection

    /**
     * Connect to Nts
     */
    async connect() {
        this.nc = await wsconnect({ servers: Config.NatsCn });
    }

    async queue_subscribe() {}

}