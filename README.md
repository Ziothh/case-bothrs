# Bothrs case
This repo contains the source code for the Bothrs case / test.

## Project structure & tech stack
It is a `pnpm` monorepo that's split in 2 parts (see `/apps` & `/packages`).

### Setup
#### `flake.nix` (optional)
I use `nix` as my general package & dotfiles manager for NixOS and MacOS (instead of brew).
See [github:Ziothh/flakes](https://github.com/Ziothh/flakes).

You can pull in all the needed dependencies by installing `nix`.
After that's done you can set up your dev environment via:
 - `direnv allow .`: sets up devshell every time you enter this project with your shell (defined in `.envrc`)
 - `nix develop .`: gets the default devshell
This will set up the correct `NodeJS` version, add `pnpm` to your path, ...

You can look at [my flake.nix](./flake.nix) for the whole configuration.

#### `pnpm`
Run `pnpm install` to download the `node_modules` for all the packages 
in the monorepo and link them together.

#### `env`
Don't forget to add a `.env` to the apps (see `.env.example`)

### `/apps`
This folder contains all the applications that should be deployed.

#### [`/apps/mobile`](./apps/mobile/README.md)
This package contains the source code of the native application.

Read the [README](./apps/mobile/README.md) for more information.

#### [`/apps/server`](./apps/server/README.md)
This is a NextJS app that's just used to expose the tRPC router.

It's hosted on [https://case-nine-id-server.vercel.app/](https://case-nine-id-server.vercel.app/).

Why NextJS? Because it's quick to set up and deploy to [Vercel](https://vercel.com).

Read the [README](./apps/server/README.md) for more information.

### `/packages`
This folder contains all the packages that are shared between the packages in `/apps`.
They are separated because applications often need to share type definitions or expose API interfaces to each other.

#### `/packages/api`
Contains the API router definition and all its related modules (~ utils / dependencies).

Notable dependencies: 
 - [zod](https://zod.dev/): validate JS values in a typesafe manner
 - [tRPC](https://trpc.io/): constructs the API router in a typesafe manner and validate API requests with `zod`
 - [prisma](https://www.prisma.io/client): ORM for DB schema type generation and typesafe queries


It exposes 2 modules:
 - `/packages/api/server`
    - Contains the API router definition and server side logic that can be mounted in HTTP server (Node, Express, NextJS, ...)
    - Consumed by the server
 - `/packages/api/client`
    - Contains the type definition of the API router
    - Consumed by the mobile app

#### `/packages/shared`
Contains utility functions and types that can be consumed by both applications and packages.

### Retool admin panel
The admin panel can be found at [https://zioth.retool.com/apps/cf809a4c-a0e2-11ee-acef-e74d2a355a63/NineID%20admin%20panel%20](https://zioth.retool.com/apps/cf809a4c-a0e2-11ee-acef-e74d2a355a63/NineID%20admin%20panel%20).
