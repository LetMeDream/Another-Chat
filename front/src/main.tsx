import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ErrorPage from './error-page.jsx'
import RedirectRoute from './routes/RedirectRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: '/redirect/:username',
    element: <RedirectRoute />,
    errorElement: <ErrorPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
