import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: 'utils/schema.ts',
  dbCredentials: {
    url: url,
  },
});
