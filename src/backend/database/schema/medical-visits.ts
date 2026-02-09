import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { employees } from './employees'
import { documents } from './documents'
import { timestamps } from './shared'

export const medicalVisits = sqliteTable('medical_visits', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  // Foreign key to employee
  employeeId: integer('employee_id').notNull().references(() => employees.id, { onDelete: 'cascade' }),

  // Visit details
  type: text('type').notNull(), // 'Visite initiale' | 'Visite périodique' | 'Visite de reprise' | 'Visite de pré-reprise'

  // Dates
  scheduledDate: integer('scheduled_date', { mode: 'timestamp' }).notNull(),
  actualDate: integer('actual_date', { mode: 'timestamp' }), // Optional: when visit was completed

  // Status
  status: text('status').notNull(), // 'scheduled' | 'completed' | 'cancelled' | 'missed'
  fitnessStatus: text('fitness_status'), // Optional: 'Apt' | 'Apt avec réserves' | 'Inapte temporaire' | 'Inapte définitif'

  // Notes
  notes: text('notes'), // Doctor's notes

  // Optional link to medical certificate document
  documentId: integer('document_id').references(() => documents.id),

  // Timestamps
  ...timestamps,
}, (table) => ({
  // Indexes for common queries
  employeeIdx: index('medical_visits_employee_idx').on(table.employeeId),
  scheduledDateIdx: index('medical_visits_scheduled_idx').on(table.scheduledDate),
  statusIdx: index('medical_visits_status_idx').on(table.status),
}))

// Type inference
export type NewMedicalVisit = typeof medicalVisits.$inferInsert
export type MedicalVisit = typeof medicalVisits.$inferSelect
