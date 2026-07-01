import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import UserProvider from './context/UserContext.jsx';
import "./styles/app.css";

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
);
