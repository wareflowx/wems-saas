import Database from 'better-sqlite3'
import { drizzle, DrizzleSQLiteDatabase } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

// Singleton state
let dbInstance: DrizzleSQLiteDatabase<typeof schema> | null = null
let isInitialized = false

/**
 * Initialize the database with a specific path
 * Called from Electron main process on startup
 */
export const initDb = (dbPath: string) => {
  if (isInitialized) {
    if (dbInstance) return dbInstance
    throw new Error('Database initialization failed')
  }

  const sqlite = new Database(dbPath)

  // Performance optimizations
  sqlite.pragma('journal_mode = WAL') // Write-Ahead Logging for concurrency
  sqlite.pragma('synchronous = NORMAL') // Balance safety vs performance
  sqlite.pragma('cache_size = -64000') // 64MB cache
  sqlite.pragma('temp_store = MEMORY') // Temp tables in RAM
  sqlite.pragma('foreign_keys = ON') // Enable foreign key constraints
  sqlite.pragma('journal_size_limit = 134217728') // 128MB WAL limit

  dbInstance = drizzle({ client: sqlite, schema })
  isInitialized = true

  return dbInstance
}

/**
 * Get the existing database instance
 * Throws if not initialized yet
 */
export const getDb = () => {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initDb(path) first.')
  }
  return dbInstance
}

/**
 * Close the database connection
 * Useful for cleanup or testing
 */
export const closeDb = () => {
  if (dbInstance) {
    // @ts-ignore - access raw SQLite client
    dbInstance.client.close()
    dbInstance = null
    isInitialized = false
  }
}

/**
 * Check if a database file exists at the given path
 */
export const dbExists = (dbPath: string) => {
  const fs = require('fs')
  return fs.existsSync(dbPath)
}
