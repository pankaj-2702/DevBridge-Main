import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './styles/global.css'
import AuthProvider from './context/AuthProvider.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ToastProvider from './context/ToastProvider.jsx';
import ModalProvider from './context/ModalProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <AuthProvider>
       <ThemeProvider>
        <ToastProvider>
          <ModalProvider>
        <App />
          </ModalProvider>
        </ToastProvider>
       </ThemeProvider>
    </AuthProvider>
     
    </BrowserRouter>
  </StrictMode>
)
