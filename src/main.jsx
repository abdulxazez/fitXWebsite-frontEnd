import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
<link rel="stylesheet" href="./App.css" />
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
import { UserQuantityProvider } from './Context/UserQuantityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <UserQuantityProvider>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </UserQuantityProvider>

  </StrictMode>,
)
