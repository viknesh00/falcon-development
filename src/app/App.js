import React, { Suspense } from 'react';
import './styles/App.css';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { AppProvider } from './providers';
// Importing from './routes' currently resolves to the deprecated helper
// in src/app/routes.js which itself now forwards to the real implementation
// in src/app/routes/index.js.  You could reference the index file directly
// (e.g. './routes/index') to be explicit and avoid confusion.
import createAppRoutes from './routes';

const AppRoutes = () => {
  const routing = useRoutes(createAppRoutes());
  return routing;
};

function App() {
  return (
    <React.Fragment>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </AppProvider>
      </BrowserRouter>
      <ToastContainer transition={Zoom} />
    </React.Fragment>
  );
}

export default App;
