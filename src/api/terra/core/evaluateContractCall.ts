import { Network } from '@/typings/finance-management';
import { getKeyByNetwork, getNetworkByKey } from '@/utils/networks';
import { Coins, Fee } from '@terra-money/terra.js';
import { convertTokenToCoin, getAmountFromCoin } from '../utils';
import { fetchGasPrices } from './fetchGasPrices';
import { fetchTaxFee } from './fetchTaxFee';
import { ContractCallEvaluationParams } from './types';

export async function evaluateContractCall({
  wallet,
  feeTokenSymbol,
  sendTokens,
  maxRetries = 3,
}: ContractCallEvaluationParams) {
  const networkKey = getKeyByNetwork(wallet.network as Network);
  const network = getNetworkByKey(networkKey);

  const gasPricesMap = await fetchGasPrices(networkKey, maxRetries);
  const feeTokenGasPrice = gasPricesMap[feeTokenSymbol];

  const totalFees = new Coins({});
  const transactionFee = Math.ceil(Number(network.fee.maxGas) * Number(feeTokenGasPrice));
  totalFees.set(feeTokenSymbol, transactionFee);

  for (let i = 0; i < sendTokens.length; i++) {
    const [tokenSymbol] = sendTokens[i];

    const taxFeeAmount = await fetchTaxFee({
      networkKey,
      token: sendTokens[i],
      maxRetries,
    });

    const taxedCoin = convertTokenToCoin([tokenSymbol, taxFeeAmount]);

    if (!getAmountFromCoin(taxedCoin)) continue;

    const existingTaxedCoin = totalFees.get(taxedCoin.denom);

    if (existingTaxedCoin) {
      totalFees.set(taxedCoin.denom, existingTaxedCoin.amount.add(taxedCoin.amount));
    } else {
      totalFees.set(taxedCoin.denom, taxedCoin.amount);
    }
  }

  return {
    gasPrices: `${feeTokenGasPrice}${feeTokenSymbol}`,
    fee: new Fee(parseInt(network.fee.maxGas), totalFees),
    networkKey,
  };
}
