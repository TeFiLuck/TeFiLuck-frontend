import { PendingGameCardProps } from '../types';

export function useCardShared({ isCurrentUserCreatorOfGame }: PendingGameCardProps) {
  function getCardTitle(): string {
    return isCurrentUserCreatorOfGame ? 'YOUR GAME' : 'YOU VS terra...dsm';
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
      &#8776; 24 Hours
    </span>
  );

  const transactionLink = '/';

  return {
    getCardTitle,
    cardStatus,
    getTooltipContent,
    signText,
    transactionLink,
  };
}
