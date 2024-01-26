import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import Login from './js/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './js/Profile';
import NotFoundPage from './js/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Login/>}/>
      <Route path='/:id' element={<Profile />} />
      <Route path='notFound' element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

