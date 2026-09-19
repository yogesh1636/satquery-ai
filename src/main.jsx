import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { checkOAuthCallback } from './utils/oauth';

// Check if current window is an OAuth popup callback
if (!checkOAuthCallback()) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
