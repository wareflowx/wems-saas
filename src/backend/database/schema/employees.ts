import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { timestamps } from './shared'

export const employees = sqliteTable('employees', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  // Identity
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),

  // Employment
  contract: text('contract').notNull(), // 'CDI' | 'CDD' | 'Intérim'
  jobTitle: text('job_title').notNull(), // 'operator' | 'accountant' | 'technician' | 'hrManager'
  workLocation: text('work_location').notNull(), // 'Site A' | 'Site B' | 'Site C' | 'Remote'

  // Status
  status: text('status').notNull(), // 'active' | 'on_leave' | 'terminated'
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }), // Optional for CDD, Intérim

  // Timestamps
  ...timestamps,
}, (table) => ({
  // Indexes for common filters
  statusIdx: index('employee_status_idx').on(table.status),
  locationIdx: index('employee_location_idx').on(table.workLocation),
  contractIdx: index('employee_contract_idx').on(table.contract),
}))

// Type inference
export type NewEmployee = typeof employees.$inferInsert
export type Employee = typeof employees.$inferSelect
