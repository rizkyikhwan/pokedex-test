import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout.tsx'
import './index.css'
import DetailPage from './pages/detail-page.tsx'
import ErrorPage from './pages/error-page.tsx'
import HomePage from './pages/home-page.tsx'
import PokedexPage from './pages/pokedex-page.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "pokemon/:pokeName",
        element: <DetailPage />
      },
      {
        path: "pokedex",
        element: <PokedexPage />
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
