import { NetworkKey } from '@/constants/networks';
import { convertTokenToCoin, getAmountFromCoin, isTaxableTokenSymbol, makeLCDClient } from '../utils';
import { Token } from './types';

export interface FetchTaxFeeParams {
  networkKey: NetworkKey;
  token: Token;
  maxRetries?: number;
}

export async function fetchTaxFee({ networkKey, token, maxRetries = 0 }: FetchTaxFeeParams): Promise<number> {
  const [tokenSymbol] = token;

  if (!isTaxableTokenSymbol(tokenSymbol)) return 0;

  let retries = 0;
  const client = makeLCDClient(networkKey);

  const loadTaxFee = async (): Promise<number> => {
    let taxedCoin = convertTokenToCoin(token);

    try {
      taxedCoin = await client.utils.calculateTax(taxedCoin);
    } catch (e) {
      if (retries < maxRetries) {
        retries += 1;
        return loadTaxFee();
      }
    }

    return getAmountFromCoin(taxedCoin);
  };

  return loadTaxFee();
}
