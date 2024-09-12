import { defineConfig } from 'drizzle-kit';

const url = 'postgresql://hiredb_owner:Ohs1ILwjUv7l@ep-young-lab-a1o4fjjk.ap-southeast-1.aws.neon.tech/hiredb?sslmode=require';

export default defineConfig({
  dialect: 'postgresql',
  schema: 'utils/schema.ts',
  dbCredentials: {
    url: url,
  },
});
