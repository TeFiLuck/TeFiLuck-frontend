import { useFinanceManagementStore } from '@/state/finance-management';
import { FC, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppEventsHandling, useAppMessagesDisplay, useBlockchainUpdates } from './hooks';
import { Routes } from './routes';

const App: FC = () => {
  useFinanceManagementStore();
  useAppMessagesDisplay();
  useBlockchainUpdates();
  useAppEventsHandling();

  useEffect(() => removeAppLoader(), []);

  function removeAppLoader(): void {
    const loader = document.getElementById('js-app-loading-screen');
    if (loader) {
      loader.style.display = 'none';
    }
  }

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
