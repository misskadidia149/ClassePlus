import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Fichier Tailwind CSS global

// Configuration Axios globale (intercepteurs)
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);