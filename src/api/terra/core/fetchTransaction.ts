import { NetworkKey, Networks } from '@/constants/networks';
import axios from 'axios';
import { Transaction } from '../types';
import { TRANSACTION_ENDPOINT_URN } from './constants';

export interface FetchTransactionParams {
  txHash: string;
  networkKey: NetworkKey;
}

export async function fetchTransaction({ txHash, networkKey }: FetchTransactionParams): Promise<Transaction> {
  const network = Networks[networkKey];
  const { data } = await axios.get<Transaction>(`${network.fcd}${TRANSACTION_ENDPOINT_URN(txHash)}`);
  return data;
}
