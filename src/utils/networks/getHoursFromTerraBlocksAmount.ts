import { TERRA_BLOCK_GENERATION_TIME_SEC } from '@/constants/networks';
import { round } from '@/utils/format';

export function getHoursFromTerraBlocksAmount(blocksAmount: number): number {
  return (round(blocksAmount) * TERRA_BLOCK_GENERATION_TIME_SEC) / 60 / 60;
}
