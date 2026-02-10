import { createRouter, createMemoryHistory } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  // Use memory history for Electron compatibility
  const memoryHistory = createMemoryHistory({
    initialEntries: ['/'],
  })

  const router = createRouter({
    routeTree,
    history: memoryHistory,
    context: {},

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}
