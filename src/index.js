import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
import Menu from './pages/Menu'
import './global.css';
import CustomThemeProvider from './Theme';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <Login />
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode >
);
