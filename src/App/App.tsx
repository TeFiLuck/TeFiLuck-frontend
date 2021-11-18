import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProviders } from './providers';
import { Routes } from './routes';

// Page lazy-loading example
// const Gallery = lazy(async () => import('pages/Gallery'))

const App: FC = () => {
  return (
    <AppProviders>
      <Router>
        <Routes />
      </Router>
    </AppProviders>
  );
};

export default App;
