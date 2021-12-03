import { AcceptedGameCard } from '@/components/coinflip/game-card/AcceptedGameCard';
import { LossGameCard } from '@/components/coinflip/game-card/LossGameCard';
import { PendingGameCard } from '@/components/coinflip/game-card/PendingGameCard';
import { PublicLiquidationGameCard } from '@/components/coinflip/game-card/PublicLiquidationGameCard';
import { ResolveGameCard } from '@/components/coinflip/game-card/ResolveGameCard';
import { VictoryGameCard } from '@/components/coinflip/game-card/VictoryGameCard';
import { FC } from 'react';
import styled from 'styled-components';

const GamesDisplay: FC = () => {
  const mode = 'default';

  return (
    <WrapperStyled>
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

const WrapperStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
`;

export default GamesDisplay;
