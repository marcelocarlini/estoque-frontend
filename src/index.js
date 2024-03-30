import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login';
import Menu from './pages/Menu'
import './global.css';
import CustomThemeProvider from './Theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
