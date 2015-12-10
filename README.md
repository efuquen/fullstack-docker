## Overview

Example of using `docker` and `docker-compose` to combine redis,
a nodejs api, and nginx webserver together.

## Installation

Make sure you have `docker` and `docker-compose` installed,
instructions can be found on the docker
[site](http://docker.com).

Then just run `docker-compose up` and the whole system should
come up without a hitch (hopefully).  The API is on port 3000,
the nginx server on port 8080, and redis on its standard port.

## Docker Machine IP

The web app on port 8080 has a hardcoded IP address to the api
in `web/public/index.html`, stored as the variable `apiHost`.
Depending on whether you are using `docker-machine` on Mac or
Windows or if you are running natively on linux this API needs
to be changed; either to the Docker Machine ip address or
localhost.

## Additional Tools and Resources

* [Slides](http://www.slideshare.net/EdwinFuquen/docker-testing-to-production)
* [Docker Docs](http://docs.docker.com)
* [CoreOS Docs](https://coreos.com/docs/)
* [Registrator](https://github.com/gliderlabs/registrator)
* [Confd](https://github.com/kelseyhightower/confd)
* [Spinnaker Docker Compose](https://github.com/spinnaker/spinnaker/tree/master/experimental/docker-compose)
