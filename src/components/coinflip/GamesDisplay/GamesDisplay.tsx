import { AcceptedGameCard } from '@/components/coinflip/game-card/AcceptedGameCard';
import { LossGameCard } from '@/components/coinflip/game-card/LossGameCard';
import { PendingGameCard } from '@/components/coinflip/game-card/PendingGameCard';
import { PublicLiquidationGameCard } from '@/components/coinflip/game-card/PublicLiquidationGameCard';
import { ResolveGameCard } from '@/components/coinflip/game-card/ResolveGameCard';
import { GameCardMode } from '@/components/coinflip/game-card/types';
import { VictoryGameCard } from '@/components/coinflip/game-card/VictoryGameCard';
import { useMediaQueries } from '@/hooks';
import { FC } from 'react';
import styled from 'styled-components';

const GamesDisplay: FC = () => {
  const { is1300PxOrLess } = useMediaQueries();

  const mode = ((): GameCardMode => {
    if (is1300PxOrLess) return 'compact';
    return 'default';
  })();

  const cardsPerRow = (() => {
    if (is1300PxOrLess) return 4;
    return 3;
  })();

  return (
    <WrapperStyled cardsPerRow={cardsPerRow}>
      <ResolveGameCard mode={mode} />
      <AcceptedGameCard mode={mode} />
      <PublicLiquidationGameCard mode={mode} />
      <PendingGameCard mode={mode} />
      <PendingGameCard mode={mode} isCurrentUserCreatorOfGame />
      <LossGameCard mode={mode} />
      <LossGameCard mode={mode} liquidated />
      <VictoryGameCard mode={mode} />
      <VictoryGameCard mode={mode} opponentLiquidated />
      <VictoryGameCard mode={mode} performedLiquidation />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{
  cardsPerRow: number;
}>`
  display: grid;
  grid-gap: 16px;

  ${({ cardsPerRow }) => `
    grid-template-columns: repeat(${cardsPerRow}, 1fr);
  `}
`;

export default GamesDisplay;
