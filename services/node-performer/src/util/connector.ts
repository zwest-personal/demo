/**
 * Connector is a basic interface for talking to external communication or data store systems
 *
 * In a real system, this would probably be overkill but wanted to add it in to demonstrate use
 * as there's not anything else in the service yet that would benefit
 */
interface Connector {
    // client is the connection client out to the external system
    client?: any;

    // service is the name of the service that owns the connector
    service: string;

    /**
     * connect will establish a connection to the external system
     *
     * Will return the object rather than the client connection
     **/
    connect(): Promise<Connector>;

    /**
     * disconnect ends the connection
     *
     * Not strictly necessary for some implementations, but useful to have something
     * there to close out the connection if desired
     *
     * @return boolean false if there was an issue disconnecting
     */
    disconnect(): Promise<boolean>;

    /**
     * ping does a simple connection check
     *
     * @return boolean false if ping failed, true if it succeeded
     */
    ping(): Promise<boolean>;

}