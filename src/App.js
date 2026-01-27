import React from 'react';
import './styles/App.css';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './routes';
import { ToastContainer, Zoom } from 'react-toastify';

const AppRoutes = () => {
  const routing = useRoutes(routes);
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
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer transition={Zoom} />
    </React.Fragment>
  );
}

export default App;
