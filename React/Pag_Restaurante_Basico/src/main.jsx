import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RegistrarUsuario from './pages/RegistrarUsuario.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/RegistrarUsuario",
    element: <RegistrarUsuario/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={routes} />
  </React.StrictMode>,
)
