import { PublicLiquidationGameCardProps } from '../types';

export function useCardShared(props: PublicLiquidationGameCardProps) {
  const cardTitle = 'terra...mnj VS terra...dsm';

  const cardStatus = 'ONGOING';

  const signText = (
    <span>
      Profit: <br />
      7% of bet size
    </span>
  );

  const tooltipContent =
    'You have a chance to perform liquidation! Just click liquidate and earn 7% from bet size. Such things happen when neither game creator resolved the game or participant liquidated his opponent.';

  const transactionLink = '/';

  return {
    cardTitle,
    cardStatus,
    signText,
    tooltipContent,
    transactionLink,
  };
}
