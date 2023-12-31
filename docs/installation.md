# Installation

[[toc]]

## Manually

clone Repo from [here](https://github.com/ai-res/server.git)

### Installation

```bash
npm install
```

### Configuration

To set up the server, follow these steps:

1. Copy the `.env.example` file to `.env` and fill in the required values.

   ```txt
   PORT=4000

   ## docker config
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=pass
   DATABASE_NAME=db
   DATABASE_URL="postgresql://postgres:pass@localhost:5432/db?schema=public"
   REDDIS_URL="redis://localhost:6379"
   #  If running without docker, pass appropriate values
   # DATABASE_URL=""
   # REDDIS_URL=""

   # for nodemailer
   EMAIL_ADDRESS=""
   EMAIL_PASSWORD="" # pass app-password if 2FA is enabled
   ```

2. Run the following commands to launch the database and seed the database:

   ```bash
   npm run db:container:up # start postgres and redis container
   npm run prisma:dev:deploy # deploy prisma schema
   npm run db:seed # seed database
   ```

3. Run the following commands to reset and seed the database:

   ```bash
   npm run db:dev # reset database then seed it
   ```

### Usage

To start the development server, run the following command:

```bash
npm run start:dev
```

The development server will be running at [http://localhost:4000](). Visit `/api` to explore all available API routes. (Note: This link is for local development.)

### Testing

For running tests, use the following command:

```bash
npm test
```

### Commiting changes

Before commiting changes, run the following command:

```bash
npm run git:pre-commit
```

::: tip
This command will build, lint, format, and run test code. ensure that all the tests are passing before commiting changes. If test are failing, you can skip them entirely if are unaware about jest testing.
:::

## Docker

### Installation

Copy this `docker-compose.yml` file to your project directory.

```yml
version: '3'
services:
  web:
    image: himanshu806/openedu:server-latest
    depends_on:
      - redis
      - postgres
    env_file:
      - .env.docker
    ports:
      - "4000:4000"
    command: sh -c "npm run db:dev && npm run start:prod"

  redis:
    image: redis:latest
    ports:
      - "6379:6379"

  postgres:
    image: postgres:latest
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=db
```

### Usage

To start the development server, run the following command, at root of your project directory (where `docker-compose.yml` file is present):

```bash
docker-compose up web -d 
```