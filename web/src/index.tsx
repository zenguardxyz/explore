import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './routes/home/Home';
import reportWebVitals from './reportWebVitals';
import {
  HashRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { NotificationsProvider } from '@mantine/notifications';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <HashRouter>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
