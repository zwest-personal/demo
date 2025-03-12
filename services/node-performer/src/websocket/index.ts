/**
 * Handle Websocket connection creation and communication
 */

import WebSocket, {RawData} from "ws";
import {jsend} from "@src/common/jsend";
import Paths from "@src/common/paths";

export default async (server: any) => {
    const websocketServer = new WebSocket.Server({
        noServer: true,
        path: Paths.Socket.Connect,
    });

    // Handle initial socket upgrade
    server.on("upgrade", (request: any, socket: any, head: any) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
            websocketServer.emit("connection", websocket, request);
        });
    });

    // Handle establishment of connection
    websocketServer.on(
        "connection",
        function connection(websocketConnection, connectionRequest) {
            websocketConnection.on("message", (message: RawData) => {
                const parsedMessage = JSON.parse(message.toString());

                // TODO Handle routing to the various message handlers
                // TODO Prepare a map of specific sockets to the clients that estalished them

                console.log(parsedMessage);

                websocketConnection.send(jsend.success({state: 'connected'}).toString(), { binary: false });
            });
        }
    );

    return websocketServer;
};