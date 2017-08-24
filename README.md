# Autopilot Pattern Ghost

This repo serves as a blueprint demonstrating [Ghost](https://ghost.org/) designed for automated operation using the [Autopilot Pattern](http://autopilotpattern.io/).

[![DockerPulls](https://img.shields.io/docker/pulls/autopilotpattern/ghost.svg)](https://registry.hub.docker.com/u/autopilotpattern/ghost/)
[![DockerStars](https://img.shields.io/docker/stars/autopilotpattern/ghost.svg)](https://registry.hub.docker.com/u/autopilotpattern/ghost/)

## Environment Variables

The Ghost container in this pattern supports the following environment variables. Other containers such as nginx and MySQL utilize their own environment variables as well.

- `CONSUL`: consul hostname
- `DEBUG`: used to control the Node.js `debug` module
- `LOG_LEVEL`: control the amount of logging from ContainerPilot
- `MYSQL_DATABASE`: the name of the MySQL database
- `MYSQL_PASSWORD`: the password used to access the MySQL database
- `MYSQL_USER`: the username used to access the MySQL database

## Example Usage

```
$ cd examples/compose
$ docker-compose up -d
$ docker-compose scale ghost=3
```

## Modifying this Pattern

This image extends the [official `ghost:1.6.1-alpine` image](https://hub.docker.com/_/ghost/). Ghost can be configured as needed by modifying `etc/config.production.json.ctmpl`, and then rebuilding the image.
