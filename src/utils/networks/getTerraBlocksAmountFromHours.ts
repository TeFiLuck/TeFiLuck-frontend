import { TERRA_BLOCK_GENERATION_TIME_SEC } from '@/constants/networks';

export function getTerraBlocksAmountFromHours(hours: number): number {
  return Math.ceil((hours * 60 * 60) / TERRA_BLOCK_GENERATION_TIME_SEC);
}
