# Database Integration Assignment Starter

Replace the in-memory repository implementation with PostgreSQL through Prisma. The starter already uses an asynchronous repository contract so services and controllers can remain stable during the swap.

## Run

```bash
npm install
npm start
```

## Prisma preparation

Copy `.env.example` to `.env` and set a local PostgreSQL URL. With Prisma 7, the datasource URL is configured in `prisma.config.ts`; `schema.prisma` contains the provider only. The app connects through Prisma's PostgreSQL driver adapter.

```bash
npm run prisma:format
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate
```

Use `npm run prisma:deploy` to apply committed migrations in a deployment environment.

Read the platform question before editing. Do not add platform-only `question.md`, answer files, tests, or specs to this repository. Never commit `.env` or real credentials.
