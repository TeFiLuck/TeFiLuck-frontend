import { NetworkKey } from '@/constants/networks';
import { getNetworkByKey } from '@/utils/networks';
import axios from 'axios';
import { FALLBACK_GAS_PRICES_MAP, GAS_PRICES_ENDPOINT_URN } from './constants';
import { GasPricesMap } from './types';

export async function fetchGasPrices(networkKey: NetworkKey, maxRetries = 0): Promise<GasPricesMap> {
  let retries = 0;
  const network = getNetworkByKey(networkKey);

  const loadGasPrices = async (): Promise<GasPricesMap> => {
    try {
      const response = await axios.get<GasPricesMap>(`${network.fcd}${GAS_PRICES_ENDPOINT_URN}`);
      return response.data;
    } catch (e) {
      if (retries < maxRetries) {
        retries += 1;
        return loadGasPrices();
      } else {
        return FALLBACK_GAS_PRICES_MAP[networkKey];
      }
    }
  };

  return loadGasPrices();
}
