import { NetworkKey } from '@/constants/networks';

export function getTerraBlockNumberLink(blockNumber: number, networkKey: NetworkKey): string {
  const environment = networkKey === NetworkKey.MAINNET ? 'mainnet' : 'testnet';
  return `https://finder.extraterrestrial.money/${environment}/blocks/${blockNumber}`;
}
