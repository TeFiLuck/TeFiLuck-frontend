import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { FooterLink } from '../../shared';
import { shortenAddress } from '../../utils';
import { PublicLiquidationGameCardProps } from '../types';

export function useCardShared(props: PublicLiquidationGameCardProps) {
  const cardTitle = `${shortenAddress('terra...mnj')} VS ${shortenAddress('terra...dsm')}`;

  const cardStatus = 'ONGOING';

  const signText = (
    <span>
      Profit: <br />
      7% of bet size
    </span>
  );

  const tooltipContent =
    'You have a chance to perform liquidation! Just click liquidate and earn 7% from bet size. Such things happen when neither game creator resolved the game or participant liquidated his opponent.';

  const footerLink = <FooterLink url={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} text="Game rules" />;

  return {
    cardTitle,
    cardStatus,
    signText,
    tooltipContent,
    footerLink,
  };
}
