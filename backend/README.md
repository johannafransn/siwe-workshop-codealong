---
title: ExpressJS Prisma
description: An ExpressJS server that uses Prisma to connect to a PostgreSQL database
tags:
  - express
  - postgresql
  - prisma
  - typescript
---

# ExpressJS Prisma Example

This is an Fastify REST API that uses [Prisma](https://www.prisma.io/) to connect to a Postgres database for creating users and authenticating them using SIWE (Sign-In-With-Ethereum).

## ✨ Features

- Prisma
- Fastify
- Postgres
- TypeScript
- Siwe
- JWT for session handling

## 💁‍♀️ How to use

- Install dependencies `npm i`

Start your local postgres server in your command line:
Run `psql postgres` then you create new user & db

Run the following to create a new user and databse

- `postgres=# CREATE USER siwe_workshop WITH PASSWORD '1q2w3e';`

- `postgres=# CREATE DATABASE siwe_workshop OWNER siwe_workshop;`

### Migrations & Database

- Add all the tables to your local db: `npm run db:generate && npm run db:dev && npm run db:deploy && npm run db:psuh`

## 📝 Notes

I have not added any authentication header to get protected endpoint
