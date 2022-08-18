ifeq ($(OS),Windows_NT)
	SHELL := pwsh.exe
else
	SHELL := pwsh
endif

.SHELLFLAGS := -NoProfile -Command

REGISTRY_NAME := ghcr.io/
REPOSITORY_NAME := pcottle/
IMAGE_NAME := learngitbranching
TAG := :latest

.PHONY: all clean test
all: build

getcommitid:
	$(eval COMMITID = $(shell git log -1 --pretty=format:'%H'))

getbranchname:
	$(eval BRANCH_NAME = $(shell (git branch --show-current ) -replace '/','.'))

build:
	docker run --rm -v $${PWD}:/mnt --workdir /mnt node:14.20.0-alpine3.16 yarn install
	docker run --rm -v $${PWD}:/mnt --workdir /mnt node:14.20.0-alpine3.16 yarn gulp fastBuild
build_docker: getcommitid getbranchname
	docker build -t $(REGISTRY_NAME)$(REPOSITORY_NAME)$(IMAGE_NAME)$(TAG) -t $(REGISTRY_NAME)$(REPOSITORY_NAME)$(IMAGE_NAME):$(BRANCH_NAME) -t $(REGISTRY_NAME)$(REPOSITORY_NAME)$(IMAGE_NAME):$(BRANCH_NAME)_$(COMMITID) .
	docker build --target export --output type=local,dest=learnGitBranching_$(BRANCH_NAME)_$(COMMITID) .

run: 
	docker run -p 8080:80 $(REGISTRY_NAME)$(REPOSITORY_NAME)$(IMAGE_NAME)$(TAG)

clean:
	echo 'not implemented'
test:
	echo 'not implemented'