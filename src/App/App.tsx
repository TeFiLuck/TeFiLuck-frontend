import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { AppProviders } from './providers';
import { Routes } from './routes';

const App: FC = () => {
  return (
    <AppProviders>
      <AppWrapperStyled>
        <Router>
          <Routes />
        </Router>
      </AppWrapperStyled>
    </AppProviders>
  );
};

const AppWrapperStyled = styled.div`
  min-height: 100vh;
  background: var(--global-app-bg-color);
`;

export default App;
