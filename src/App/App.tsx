import { useFinanceManagementStore } from '@/state/finance-management';
import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppMessagesDisplay } from './hooks';
import { Routes } from './routes';

const App: FC = () => {
  useFinanceManagementStore();
  useAppMessagesDisplay();

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
