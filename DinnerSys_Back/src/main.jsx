import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './PRouteContent/ProtectedRoute';
import Login from './pages/Login';
import Mesero from './pages/Mesero';
import Pedido from './pages/Pedido';
import { AuthProvider } from './auth/AuthProvider';
import Navbar from './components/Navbar';
import MeseroHome from './pages/MeseroHome';
import Carrusel from './components/Carrusel';
import PedidosRealizados from './pages/PedidosRealizados';

/* Instalar: 
react-router-dom -> para las rutas y navegación por las páginas

npm i react-router-dom 

Rutas protegidas 
https://www.youtube.com/watch?v=q4ywr3eZmk0&ab_channel=VidaMRR-Programacionweb
*/

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/Mesero/:MsroId",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Mesero/:MsroId",
        element: <Mesero />
      },
      {
        path: "/Mesero/:MsroId/Pedidos",
        element: <Pedido />
      },
      {
        path: "/Mesero/:MsroId/Home",
        element: <MeseroHome />
      },
      {
        path: "/Mesero/:MsroId/PedidosRealizados",
        element: <PedidosRealizados/>
      }
    ],
  },

])

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <RouterProvider router={routes} />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
