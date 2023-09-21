import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './pages/Admin';
import Registro from './pages/Registro';
import Usuario from './pages/Usuario';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/Admin",
    element: <Admin/>
  },
  {
    path: "/User",
    element: <Registro/>
  },
  {
    /* Para hacer direcciones con rutas dinámicas, se le 
    pone ":" y el nombre se usará para identificarlo haciendo uso del
    hook const {nombreRutaDinamica(en nuestro caso userId)} = useParams(), para un ej mas claro
    ir a la carpeta ./pages/Usuario.jsx */
    path: "/User/:userId",
    element: <Usuario/>
  }
]);

// const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>
)