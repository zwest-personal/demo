// Note to viewer - Was *not* expecting an Express API for a test!
// Granted I'm happy it's not the usual leetcode type stuff, but also
// thankful I've done some express research recently
// In my last position our largest NodeJS system was built on HapiJS

// I will be coding most of this in IntelliJ and bringing it over here rather than doing it
// in the editor, so you might need to skip ahead a fair bit to see activity in this screen.

// Full dev env will be:
// IntelliJ for IDE
// Win10 for OS
// Git Bash for basic runs/installs/etc
// I do use WSL for more complex projects.
// NodejS version is 22 in personal env, but don't expect any compatibility issues

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let configuration = {
    /**
     * "<route>" : { // <eg : /items>
     *     "dest": "<destionation url>",
     *     "limited": "<bool - just a simple flag to indicate if we need to limit at all for this route>",
     *     "clients": {
     *         // If empty, no restrictions, else:
     *         "<clientId>": {
     *              "limit":<limit>,
     *              "seconds":<seconds>
     *         }
     *     }
     * }
     */
};

// For each request, log the route, clientId, and a timestamp
// Original had const, but we want to override the entire obj
let requests = {
    /**
     "<route>": {
     "<clientId>": {
     "<unix timestamp (in seconds)>":<queries>
     }

     }
     **/

};

// Note: Example has a different path here, so may allow for both the /configure and /configuration endpoints to function
// Note 2: Problem definition states that a request to /configure should overwrite previous configuration
//   As written, means to overwrite all routes and not just on a per-route basis
app.post('/configure', (req, res) => {
    // Accept POST body as defined, store configuration
    // In a full server, this would go into a DB
    // Body is parsed auto

    // Check for empty Routes
    // If no route provided (problem description permits this), blank out the rate limiter
    // Unclear if we should still allow for clients to do anything if there are no routes
    if (!('routes' in req.body) || !('clients' in req.body)) {
        res.status(400).send({"error": "routes and clients cannot be undefined"});
        return;
    }

    if (req.body.routes.length === 0) {
        configuration = {};
        // TODO Error "Cannot set headers after they are sent to the client"
        res.status(200).send({"message": "Rate limiting configuration reset"});
        return;
    }

    let newConfiguration = {};
    let newRequests = {};

    // Iterate over the provided routes to generate the updated configuration
    for (const route of req.body.routes) {
        // Source and destination required for each route
        if (!route.sourcePath || !route.destinationUrl) {
            res.status(400).send({"error": "Each route must contain source and destination.  Configuration not saved."});
            return;
        } else if (route.sourcePath.startsWith("/configure")) {
            res.status(400).send({"error": "/configure can not be rate limited.  Configuration not saved."});
            return;
        }
        ;

        // TODO Validate that the path and URL are valid, would be best done via Joi
        newConfiguration[route.sourcePath] = {
            "dest": route.destinationUrl,
            "limited": true,
            "clients": {}
        };

        newRequests[route.sourcePath] = {};

        // No rate limiting if no clients were provided
        if (!('clients' in req.body) || req.body.clients.length === 0) {
            newConfiguration[route.sourcePath].limited = false;
            continue;
        }

        // Iterate over all client defs - all routes must implement all rate limits
        for (const client of req.body.clients) {
            if (!('clientId' in client)) {
                res.status(400).send({"error": "clientId is required for all client objects"});
                return;
            }

            // Set defaults if not provided
            if (!('limit' in client)) {
                client.limit = 1;
            }
            if (!('seconds' in client)) {
                client.seconds = 1;
            }

            // Would use Joi for this too
            if (typeof client.limit !== 'number' || typeof client.seconds !== 'number') {
                res.status(400).send({"error": "client limit and seconds values must be numbers (or omitted)"});
                return;
            }

            newConfiguration[route.sourcePath].clients[client.clientId] = {
                limit: client.limit,
                seconds: client.seconds,
            };
            newRequests[route.sourcePath][client.clientId] = {};
        }
    }

    // Save new routes
    configuration = newConfiguration;

    // Reset rate limiter
    requests = newRequests;

    res.status(200).send({"message": "Configuration replaced"})
});

/**
 * Take all other queries, of any format
 *
 * Look up the route in our configuration table and prep rate limiting as appropriate
 */
app.all('*', (req, res) => {
    // Read route/load config, 404 error if route not found
    if (typeof configuration[req.url] === 'undefined') {
        // Route not found, 404
        res.status(404).send({"message": "Configuration replaced"});
        return;
    }

    const clientId = req.headers["client-id"];
    // According to rubric, client-id is always required
    if (clientId === "") {
        res.status(400).send({"message": "client-id header is required"});
        return;
    }

    // If no clients are configured for this route, automatically forward the request on as
    // there is no limit
    const route = configuration[req.url]
    if (!route.limited) {
        res.redirect(route.dest, 302);
        return;
    }

    if (typeof route.clients[clientId] === 'undefined') {
        res.status(404).send({"message": "client-id not configured for access"});
        return;
    }

    const client = configuration[req.url].clients[clientId]

    // Get timestamp (seconds)
    const now = Math.floor(+new Date() / 1000);

    // Initialize rate if not set
    if (typeof requests[req.url][clientId] === 'undefined') {
        requests[req.url][clientId] = {};
    }
    if (typeof requests[req.url][clientId][now] === 'undefined') {
        requests[req.url][clientId][now] = 0;
    }

    // Increment
    requests[req.url][clientId][now] = 1;

    // Look at number of requests over the number of seconds we're rate limiting by
    // Not rounding to nearest second rather than going absolute on ms
    const start = now - client.seconds;

    // Calculate total hits over
    // Note - in a distributed env, could do something like use Redis with scoring to build out the rates
    let hits = 0;
    for (let t = start; t <= now; t++) {
        hits += (typeof requests[req.url][clientId][t] !== 'undefined') ? requests[req.url][clientId][t] : 0;
    }

    // TODO Exceeded limit, throw error
    if (hits > client.limit) {
        res.status(429).send({'message':'rate exceeded'});
        return;
    }

    res.redirect(route.dest, 302);
});

module.exports = app;
