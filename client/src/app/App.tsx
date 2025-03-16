import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './Routes';

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

//TODO: COMPROBAR QUE TODO SEA REACT.FC
//TODO: COMPROBAR QUE SE USAN LAS CONSTANTES DE API-URLS
//TODO: COMPROBAR QUE SE USAN LAS COSNTANTES DE PATHS
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
