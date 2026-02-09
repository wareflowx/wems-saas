import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { employees } from './employees'
import { timestamps } from './shared'

export const documents = sqliteTable('documents', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  // Optional foreign key to employee (null for global documents)
  employeeId: integer('employee_id').references(() => employees.id, { onDelete: 'set null' }),

  // Metadata
  name: text('name').notNull(), // 'Contrat_CDID_Dupont.pdf'
  type: text('type').notNull(), // 'Contrat', 'CACES', 'Visite médicale', 'Identification'
  category: text('category').notNull(), // 'pdf' | 'image' | 'doc' | 'xls' | 'other'

  // File info
  path: text('path').notNull(), // Local file path
  size: integer('size').notNull(), // File size in bytes
  mimeType: text('mime_type'), // 'application/pdf', 'image/jpeg', etc.

  // Timestamps
  ...timestamps,
}, (table) => ({
  // Indexes for common queries
  employeeIdx: index('documents_employee_idx').on(table.employeeId),
  typeIdx: index('documents_type_idx').on(table.type),
  categoryIdx: index('documents_category_idx').on(table.category),
}))

// Type inference
export type NewDocument = typeof documents.$inferInsert
export type Document = typeof documents.$inferSelect
