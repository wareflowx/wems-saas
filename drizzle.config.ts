import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/backend/database/schema/index.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_PATH || './wems.db',
  },
})
