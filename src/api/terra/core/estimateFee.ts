import { NetworkKey } from '@/constants/networks';
import { CreateTxOptions, Fee } from '@terra-money/terra.js';
import { makeLCDClient } from '../utils';
import { fetchAccountInfo } from './fetchAccountInfo';

export interface EstimateFeeParams {
  networkKey: NetworkKey;
  address: string;
  txOptions: CreateTxOptions;
  maxRetries?: number;
}

export async function estimateFee({ networkKey, address, txOptions, maxRetries = 0 }: EstimateFeeParams): Promise<Fee> {
  let retries = 0;
  const client = makeLCDClient(networkKey);

  const loadFeeEstimation = async (): Promise<Fee> => {
    try {
      const accountInfo = await fetchAccountInfo({ networkKey, address, maxRetries });

      return client.tx.estimateFee(
        [
          {
            sequenceNumber: accountInfo.getSequenceNumber(),
            publicKey: accountInfo.getPublicKey(),
          },
        ],
        txOptions,
      );
    } catch (err) {
      if (retries < maxRetries) {
        retries += 1;
        return loadFeeEstimation();
      } else {
        throw err;
      }
    }
  };

  return loadFeeEstimation();
}
