// Browser-compatible stub for @tanstack/react-start
// This file provides minimal implementations to replace TanStack Start's Node.js dependencies

export const createStart = () => ({
  router: null,
  ssr: false
})

// Re-export what we can from @tanstack/react-router
export * from '@tanstack/react-router'
