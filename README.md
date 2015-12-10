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

The web app on port 8080 has a hardcoded IP address to


## Additional Tools and Resources

* [Docker Docs](http://docs.docker.com)
* [Spinnaker Docker Compose](https://github.com/spinnaker/spinnaker/tree/master/experimental/docker-compose)
