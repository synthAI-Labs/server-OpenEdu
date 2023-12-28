
### Installation

```bash
npm install
```

### Configuration

To set up the server, follow these steps:

1. Copy the `.env.example` file to `.env` and fill in the required values.

   ```txt
   PORT=4000

   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=pass
   DATABASE_NAME=db
   DATABASE_URL="postgresql://postgres:pass@localhost:5432/db?schema=public"
   ```

2. Run the following commands:

   ```bash
   npm run db:container:up # start postgres and redis container
   npm run prisma:dev:deploy # deploy prisma schema
   npm run db:seed # seed database
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
