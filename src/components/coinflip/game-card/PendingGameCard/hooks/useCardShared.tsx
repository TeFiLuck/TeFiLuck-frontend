import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { useAddress } from '@/hooks';
import { FooterLink } from '../../shared';
import { displayResolveTimeLimit, shortenAddress } from '../../utils';
import { PendingGameCardProps } from '../types';

export function useCardShared({ game }: PendingGameCardProps) {
  const userAddress = useAddress();

  const isCurrentUserCreatorOfGame = game.owner === userAddress;

  function getCardTitle(): string {
    return isCurrentUserCreatorOfGame ? 'YOUR GAME' : `YOU VS ${shortenAddress(game.owner)}`;
  }

  const cardStatus = 'PENDING';

  function getTooltipContent(): string {
    if (isCurrentUserCreatorOfGame) {
      return 'We can\'t display your choice because it\'s safely encrypted with your password.';
    }
    return 'Your opponent already chosen the side. If you guess it correct - you WIN, good luck!';
  }

  const signText = (
    <span>
      Resolve time: <br />
      &#8776; {displayResolveTimeLimit(game.blocks_until_liquidation)}
    </span>
  );

  const footerLink = <FooterLink url={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} text="Game rules" />;

  return {
    isCurrentUserCreatorOfGame,
    getCardTitle,
    cardStatus,
    getTooltipContent,
    signText,
    footerLink,
  };
}
