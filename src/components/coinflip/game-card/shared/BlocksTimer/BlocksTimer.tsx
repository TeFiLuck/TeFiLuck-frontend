import { getHoursFromTerraBlocksAmount } from '@/utils/networks';
import { FC } from 'react';

export interface BlocksTimerProps {
  current: number;
  end: number;
}

export const BlocksTimer: FC<BlocksTimerProps> = ({ current, end }) => {
  const blocksLeft = end - current;
  const isTimeExceeded = blocksLeft <= 0;
  const totalSecondsLeft = Math.floor(getHoursFromTerraBlocksAmount(blocksLeft) * 60 * 60);

  const hoursLeft = Math.floor(totalSecondsLeft / 60 / 60);
  const minutesLeft = Math.floor((totalSecondsLeft - hoursLeft * 60 * 60) / 60);
  const secondsLeft = totalSecondsLeft - hoursLeft * 60 * 60 - minutesLeft * 60;

  function displayTimeUnit(unit: number): string {
    if (isTimeExceeded) return '00';
    if (String(unit).length < 2) return `0${unit}`;
    return String(unit);
  }

  return (
    <span>
      {!isTimeExceeded && <span>&#8776;</span>}
      {displayTimeUnit(hoursLeft)}:{displayTimeUnit(minutesLeft)}:{displayTimeUnit(secondsLeft)}
    </span>
  );
};
