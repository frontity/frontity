# E2E Tests for the Frontity CLI

These tests allow you to test the full lifecycle of the [Frontity
CLI](https://api.frontity.org/frontity-cli) commands in isolated
environments. They can be run locally and on GitHub Actions.

## Why?

We want to be able to test that running Frontity CLI commands like `frontity create my-awesome-app` or `frontity create-package xyz` succeeds from beginning
to end. For example, we would like to assert that after having run a certain command,
particular files have been created on the user's machine.

## Docker and filesystem tests difference

There are currently 2 types of tests (`docker` and `filesystem`) each in its
corresponding folder. The `docker` tests run each test case in a separate docker
container so they can create and destroy files without affecting the host's filesystem.

In order to test cross-platform compatibility, we also run some "basic" tests
which use the _filesystem_ (hence the name) of the machine on which the tests are
run. Those tests can be run locally, but are really meant for GitHub Actions, where we
can test that they run successfully on Linux, Windows and macOS. See the [workflow
file](/.github/workflows/cli-e2e.yml) for more details.

## Requirements

You need to have [docker](https://www.docker.com/get-started) installed on your machine.

## Usage

### Running the tests locally (on your machine)

```sh
cd packages/frontity

# Run the docker tests
npm run test:cli-e2e:docker

# Run the filesystem tests
npm run test:cli-e2e:filesystem
```

### Adding new tests

It is recommended to create new tests based on the existing
ones. The tests for [`frontity create`](/packages/frontity/cli-e2e/docker/create.test.ts) are a good example.

E.g. when creating new `docker` tests you will probably want to use the
`testContainer` function from [`./utils.ts`](/packages/frontity/cli-e2e/docker/utils.ts), which is meant to facilitate creating
the test cases with `jest` by starting a new container before the test run and
removing it after the test completes.

#### Writing tests that can be run both on CI and locally

Inside of the `beforeAll()` function of your test file, you will probably need
to build the docker image that your test cases will use. Take a look at the
example in [`create.test.ts`](/packages/frontity/cli-e2e/docker/create.test.ts).
In GitHub Actions, building the docker image should already be taked care of as
one of the steps of the test job.
