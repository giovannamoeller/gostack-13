import React from 'react';
import GlobalStyle from './styles/global';

import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

const App:React.FC = () => (
  <>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
    <GlobalStyle/>
  </>
)

export default App;
