import React from 'react';
import GlobalStyle from './styles/global';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks/index';

const App:React.FC = () => {

  return (
    <Router>
      <AppProvider>
        <Routes/>
        <GlobalStyle/>
      </AppProvider>
    </Router>
  )
}

export default App;
