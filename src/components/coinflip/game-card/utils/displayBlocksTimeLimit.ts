import { getHoursFromTerraBlocksAmount } from '@/utils/networks';

export function displayBlocksTimeLimit(blocksTimeLimit: number): string {
  const hours = getHoursFromTerraBlocksAmount(blocksTimeLimit);
  const fullHours = Math.floor(hours);
  const minutesDouble = hours - fullHours;
  const fullMinutes = Math.floor(minutesDouble * 60);

  const finalResult: string[] = [];

  if (fullHours) finalResult.push(`${fullHours}h`);
  if (fullMinutes) finalResult.push(`${fullMinutes}min`);

  if (!finalResult.length) return 'Instant';

  return finalResult.join(' ');
}
