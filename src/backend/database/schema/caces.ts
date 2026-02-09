import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { employees } from './employees'
import { documents } from './documents'
import { timestamps } from './shared'

export const caces = sqliteTable('caces', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  // Foreign key to employee
  employeeId: integer('employee_id').notNull().references(() => employees.id, { onDelete: 'cascade' }),

  // CACES details
  category: text('category').notNull(), // '1A', '3', '5', '7', '1B', etc.

  // Dates
  dateObtained: integer('date_obtained', { mode: 'timestamp' }).notNull(),
  expirationDate: integer('expiration_date', { mode: 'timestamp' }).notNull(),

  // Optional link to scanned document
  documentId: integer('document_id').references(() => documents.id),

  // Timestamps
  ...timestamps,
}, (table) => ({
  // Indexes for common queries
  employeeIdx: index('caces_employee_idx').on(table.employeeId),
  categoryIdx: index('caces_category_idx').on(table.category),
  expirationIdx: index('caces_expiration_idx').on(table.expirationDate),
}))

// Type inference
export type NewCaces = typeof caces.$inferInsert
export type Caces = typeof caces.$inferSelect
