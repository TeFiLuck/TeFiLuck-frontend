import { CoinSide } from '@/constants/coinflip';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { getCoinSideColor, getCoinSideIcon } from '@/utils/coinflip';
import { FooterLink } from '../../shared';
import { displayResolveTimeLimit, shortenAddress } from '../../utils';
import { AcceptedGameCardProps } from '../types';

export function useCardShared(props: AcceptedGameCardProps) {
  const { game } = props;

  const cardTitle = `YOU VS ${shortenAddress(game.owner)}`;
  const cardStatus = 'ONGOING';

  const canLiquidate = false;

  const sideChoice = CoinSide.Tails;
  const chosenSideColor = getCoinSideColor(sideChoice);
  const ChosenSideIcon = getCoinSideIcon(sideChoice);

  const signText = (
    <span>
      Resolve time: <br />
      &#8776; {displayResolveTimeLimit(game.blocks_until_liquidation)}
    </span>
  );

  const tooltipContent = (
    <span>
      To complete game, your opponent should resolve it with his password. However if he fails to do so in resolve
      time-limit, you will be able to liquidate him and claim the profit.
      <br />
      Be aware, that after he fails to resolve game, you will have 10 minutes to liquidate him yourself to get max
      profit - 97% of his bet size.
      <br />
      If you fail to liquidate him within specified time-limit, the game will be publicly liquidatable and you might end
      up getting 90% of total profit.
    </span>
  );

  const gameInfoContents = [
    {
      label: 'Started at',
      value: '22367666',
      tooltip: 'Block number when you have responded on game',
    },
    {
      label: 'Liquidatable at',
      value: '22367666',
      tooltip:
        'If game is not resolved, you will be able to liquidate your opponent starting from following block number',
    },
    {
      label: 'Till liquidatable',
      value: <span className="text-color-primary">&#8776;01:54:00</span>,
      tooltip: '',
    },
    {
      label: 'Publicly liquidatable',
      value: '22367666',
      tooltip:
        'If game is not resolved and you will not liquidate it within available time-limit, any person will be able to liquidate the game. No worries, you will still get 90% of profit.',
    },
  ];

  const footerLink = <FooterLink url={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} text="Game rules" />;

  return {
    cardTitle,
    cardStatus,
    canLiquidate,
    chosenSideColor,
    ChosenSideIcon,
    signText,
    tooltipContent,
    gameInfoContents,
    footerLink,
  };
}
