import { getHoursFromTerraBlocksAmount } from '@/utils/networks';

export function displayResolveTimeLimit(resolveTimeLimit: number) {
  const hours = getHoursFromTerraBlocksAmount(resolveTimeLimit);
  const fullHours = Math.floor(hours);
  const minutesDouble = hours - fullHours;
  const fullMinutes = Math.floor(minutesDouble * 60);

  const finalResult: string[] = [];

  if (fullHours) finalResult.push(`${fullHours}h`);
  if (fullMinutes) finalResult.push(`${fullMinutes}min`);

  if (!finalResult.length) return 'Instant';

  return finalResult.join(' ');
}
