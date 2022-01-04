import { DEFAULT_FEES_TOKEN_SYMBOL } from '@/constants/finance-management';
import { Network } from '@/typings/finance-management';
import { getKeyByNetwork, getNetworkByKey } from '@/utils/networks';
import { estimateFee } from './estimateFee';
import { fetchGasPrices } from './fetchGasPrices';
import { ContractCallEvaluationParams } from './types';

export async function evaluateContractCall({
  wallet,
  feeTokenSymbol,
  txOptions,
  maxRetries = 3,
}: ContractCallEvaluationParams) {
  const networkKey = getKeyByNetwork(wallet.network as Network);
  const network = getNetworkByKey(networkKey);
  const feeSymbol = feeTokenSymbol || DEFAULT_FEES_TOKEN_SYMBOL;

  const gasPricesMap = await fetchGasPrices(networkKey, maxRetries);
  const feeTokenGasPrice = gasPricesMap[feeSymbol];
  const gasPrices = `${feeTokenGasPrice}${feeSymbol}`;

  const fee = await estimateFee({
    networkKey,
    address: wallet.terraAddress,
    txOptions: {
      ...txOptions,
      gasPrices,
      gasAdjustment: network.gasAdjustment,
    },
    maxRetries,
  });

  return {
    gasPrices,
    fee,
    networkKey,
  };
}
