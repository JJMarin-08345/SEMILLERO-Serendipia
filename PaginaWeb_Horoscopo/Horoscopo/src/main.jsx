import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Admin from './pages/Admin';
import Registro from './pages/Registro';
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