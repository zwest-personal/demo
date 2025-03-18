import {connect, Subscription, SubscriptionOptions, NatsError, Msg} from "nats";
import type {NatsConnection} from "nats";

import Config from '@src/common/config';

export class Nats implements Connector {
    client!: NatsConnection
    service: string;

    constructor(service_name: string) {
        this.service = service_name
    }

    /**
     * Connect to Nats
     */
    async connect(): Promise<Connector> {
        this.client = await connect({servers: Config.NatsCn});
        return this
    }

    /**
     * disconnect from Nats
     *
     * @return boolean True if we disconnected okay
     */
    async disconnect(): Promise<boolean> {
        try {
            // Drain all pending calls
            await this.client.drain()

            // Disconnect
            await this.client.close()

            return true
        } catch (e) {
            // TODO Log/throw error back down
            return false
        }
    }

    /**
     * ping the Nats server to check for connection
     */
    async ping(): Promise<boolean> {
        try {
            await this.client.flush();
            return true
        } catch (e) {
            // TODO Add in some logical handling for a ping error
            return false
        }
    }

    /***********************************************
     *          Non-Interface Methods
     ***********************************************/

    /**
     * subscribe to a Nats subject
     *
     * Takes in a handler and a flag if this is a 'queue' subscription, in which only one
     * handler in the group (which is simply a shared name) handles the request.
     *
     * If not a queue, then all handlers of this subject will accept the request.
     *
     * @param subject string Nats subject to listen for
     * @param handler function Function to handle any received messages
     * @param is_queue boolean Flag if this should be configured as a 'queue' listener
     *
     * @return Subscription Nats subscription
     */
    async subscribe(subject: string, handler: (err: NatsError | null, msg: Msg) => void,
                    is_queue: boolean = true): Promise<Subscription> {

        try {
            // Auto connect if we don't have a client yet
            // In a more mature service would probably error here instead in case there's no connection for
            // some reason we need to be concerned about
            if (!this.client) {
                await this.connect()
            }

            const opts: SubscriptionOptions = {
                queue: (is_queue) ? this.service : undefined,
                callback: handler,
            }

            console.info("Listening on: ", subject)

            return this.client.subscribe(subject, opts)
        } catch (e) {
            // TODO Log the error/take action
            throw e
        }
    }

    // TODO Add a responder here?
}