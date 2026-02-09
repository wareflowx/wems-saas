import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'

// Import styles
import './styles.css'

// Create root element
const rootElement = document.getElementById('app')!

// Create router instance
const router = getRouter()

// Hydrate the app
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
