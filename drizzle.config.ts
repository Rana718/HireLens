import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: 'utils/schema.ts',
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL as string,
  },
});
