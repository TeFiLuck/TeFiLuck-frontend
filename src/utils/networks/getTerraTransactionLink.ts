import { NetworkKey, Networks } from '@/constants/networks';

export function getTerraTransactionLink(txHash: string, networkKey: NetworkKey): string {
  const network = Networks[networkKey];
  return `https://finder.terra.money/${network.chainID}/tx/${txHash}`;
}
