# Server
> TO BE UPDATED

uses NestJS, Prisma, and Postgres

## Getting Started

### Installation

```bash
npm install
```

### Configuration

copy .env.example to .env and fill in the values

```txt
PORT=4000

DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=pass
DATABASE_NAME=db
DATABASE_URL="postgresql://postgres:pass@localhost:5432/db?schema=public"
```

Then run

```bash
npm run db:container:up # start postgres and redis container
npm run prisma:dev:deploy # deploy prisma schema
npm run db:seed # seed database
```

### Usage

```bash
npm run start:dev
```

the development server will be running at http://localhost:4000, visit `/api` to see all the api routes

### Testing

```bash
npm test
```

