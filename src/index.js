import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import Login from './pages/Login';
import CustomThemeProvider from './Theme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <Login />
    </CustomThemeProvider>
  </React.StrictMode>
);
