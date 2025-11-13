import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router'
import AuthProvider from './provider/AuthProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);
