# Local Docker Compose Setup

Simple HTTPS proxy for localhost, to run the demo in a sorta-HTTPS env:
https://github.com/esplo/docker-local-ssl-termination-proxy

This will generate the reverse proxy's to services running on localhost, attached to the local.dev domain.

Uses a self-signed cert, so browser needs to be configured to be okay with that.

If it's a headache to get going, may add in an 'insecure' option to just run it on 8080 instead of having the hoops.