# Node Performer

Node + TypeScript 'performer' service.

Not much quite yet, just the base TS boilerplate with some cleanup of the excess stuff - this boilerplate
has a nice folder/file setup but generates a crazy amount of excess scaffolding.

This service, like others, has a lot of 'in progress' stuff either that doesn't
quite work yet or I didn't commit up at all (eg unit tests)

## Boilerplate Generator About

This project was created initially with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript) just
to get a file structure going.

# Running in Docker

If using the root compose, the below script calls can be ignored.  Nodemon will be run in the Docker container
automatically and will watch this directory via a volume mount.

## Available Scripts

### `npm run dev` or `npm run dev:hot` (hot reloading)

Run the server in development mode.<br/>

**IMPORTANT** development mode uses `swc` for performance reasons which DOES NOT check for typescript errors. Run `npm run type-check` to check for type errors. NOTE: you should use your IDE to prevent most type errors.


### `npm test` or `npm run test:hot` (hot reloading)

Run all unit-tests.


### `npm test -- "name of test file" (i.e. users).`

Run a single unit-test.


### `npm run lint`

Check for linting errors.


### `npm run build`

Build the project for production.


### `npm start`

Run the production build (Must be built first).


### `npm run type-check`

Check for typescript errors.

