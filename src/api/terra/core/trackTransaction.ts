import { NetworkKey } from '@/constants/networks';
import { Transaction } from '../types';
import { MAX_TX_POLLING_RETRIES, TX_POLLING_INTERVAL_MS } from './constants';
import { fetchTransaction } from './fetchTransaction';

export interface TrackTransactionParams {
  txHash: string;
  networkKey: NetworkKey;
  onSuccess?: (payload: { transaction: Transaction }) => void;
  onError?: (payload: { reason: string; txHash: string; isExecuted: boolean }) => void;
}

export function trackTransaction({
  txHash,
  networkKey,
  onSuccess = () => {},
  onError = () => {},
}: TrackTransactionParams) {
  let retries = 0;

  const loadTransaction = async () => {
    try {
      const transaction = await fetchTransaction({ txHash, networkKey });

      if (transaction.code) {
        onError({
          reason: transaction.raw_log,
          txHash,
          isExecuted: true,
        });
      } else {
        onSuccess({ transaction });
      }
    } catch (err) {
      if (retries < MAX_TX_POLLING_RETRIES) {
        setTimeout(loadTransaction, TX_POLLING_INTERVAL_MS);
        retries += 1;
      } else {
        onError({
          reason:
            'The execution of this transaction is taking a little longer than usual. It has been successfully broadcasted, but have not been executed yet.',
          txHash,
          isExecuted: false,
        });
      }
    }
  };

  loadTransaction();
}
