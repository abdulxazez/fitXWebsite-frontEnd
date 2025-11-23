import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
<link rel="stylesheet" href="./App.css" />
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
router

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
