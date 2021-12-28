import { shortenStr } from '@/utils/format';

export function shortenAddress(address: string): string {
  return shortenStr(address, 5, 3);
}
