import { CreateTxFailed, Timeout, TxFailed, TxUnspecifiedError, UserDenied } from '@terra-money/wallet-provider';

export function getMessageFromPostTransactionError(err: unknown): string {
  if (err instanceof UserDenied) {
    return 'Transaction denied by user';
  } else if (err instanceof TxFailed || err instanceof CreateTxFailed) {
    return `Transaction Failed: ${err.message}`;
  } else if (err instanceof Timeout) {
    return 'Timeout error, failed to receive transaction-post response';
  } else if (err instanceof TxUnspecifiedError) {
    return `Unspecified Error: ${err.message}`;
  }

  return `Unknown Error: ${err instanceof Error ? err.message : String(err)}`;
}
