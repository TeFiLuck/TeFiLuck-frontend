import TransactionModal from '@/components/TransactionModal/TransactionModal';
import { useAppDispatch, useAppSelector } from '@/state';
import { setIsTransactionModalOpened, useFinanceManagementStore } from '@/state/finance-management';
import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppMessagesDisplay, useBlockchainUpdates } from './hooks';
import { Routes } from './routes';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const [transactionModalKey, setTransactionModalKey] = useState(uuidv4());
  const { isTransactionModalOpened, transactionConfig } = useAppSelector((state) => state.financeManagement);

  useFinanceManagementStore();
  useAppMessagesDisplay();
  useBlockchainUpdates();

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

      <TransactionModal
        key={transactionModalKey}
        visible={isTransactionModalOpened}
        transactionConfig={transactionConfig}
        onChange={(isVisible) => dispatch(setIsTransactionModalOpened(isVisible))}
        onClosed={() => setTransactionModalKey(uuidv4())}
      />
    </Router>
  );
};

export default App;
