import { sqliteTable, integer } from 'drizzle-orm/sqlite-core'

// Reusable timestamps for audit trail
export const timestamps = {
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}
