#
# Basic helper commands
# I tend to use Make for its cross-platform-friendliness (or at least 'Any OS can run a *nix like shell),
# but have no specific attachment to it
#
# A lot of this is an echo of a far larger and more complex Makefile I authored for our Bridge product at PSI
# Aside from some awkwardness dealing with small differences between MacOS and *nix command shells, most
# things worked pretty well.
#

GO ?= go
SERVICE_PATH = services

# Version string - just a handy thing to have if you want the front end to display a SEMVER
VERSION_GIT := $(shell git describe --tags --always | grep -o '[0-9]\.[0-9]\.[0-9]')
VERSION := $(VERSION_GIT)

.PHONY: composition
composition:
	docker-compose -f docker-compose.local.yml up --build

.PHONY: go
go:
	@echo "Building and running the Go performer using local env file..."
	cd services/go-performer && ENV_FILE=.env.local $(GO) run ./main.go
	@echo "Local Go performer checking out."

rust:

cs:

node:

py:
	@echo "Building and running the Py conductor in Docker using local env file..."
	docker-compose -f docker-compose.py-conductor.local.yml up --build
	@echo "Py Conductor checking out."

.PHONY: pygo
pygo:
	@echo "Building and running the Py conductor with Go performer in Docker using local env file..."
	docker-compose -f docker-compose.py-go.local.yml up --build
	@echo "Py Conductor and Go performer checking out."

.PHONY: ticnetoe
ticnetoe:
	@echo "Building and running TicNEToe UI and API..."
	docker-compose -f docker-compose.ticnetoe.local.yml up --build
	@echo "TicNEToe closing down."

clean:
	docker system prune -y

.PHONY: $(addprefix .push/, $(IMAGES)) clean

% ::
	@:
