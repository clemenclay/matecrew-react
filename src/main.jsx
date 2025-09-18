import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.jsx';

createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div style={{padding: 24}}>Loading…</div>}>
    <RouterProvider router={router} />
  </Suspense>
);
