import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config()

export default {
  schema: './server/db/model/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
  verbose: true,
  strict: true,
} satisfies Config
