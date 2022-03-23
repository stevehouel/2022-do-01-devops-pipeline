SHELL:=/bin/bash

.DEFAULT_GOAL := install
.PHONY: bootstrap

export REGION ?= eu-west-3

install:
	yarn install --frozen-lockfile
	yarn bootstrap

build:
	@yarn build

synth:
	@cd packages/infra && \
	yarn cdk synth -a bin/infra.js

test-integration:
	@curl -Ssf $(ARGS)

deploy:
	@yarn bootstrap
	@yarn build
	@cd packages/infra && \
	yarn cdk deploy QuickstartContainerPipelineStack
