import { AcceptedGameCard } from '@/components/coinflip/game-card/AcceptedGameCard';
import { LoadingGameCard } from '@/components/coinflip/game-card/LoadingGameCard';
import { LossGameCard } from '@/components/coinflip/game-card/LossGameCard';
import { PendingGameCard } from '@/components/coinflip/game-card/PendingGameCard';
import { PublicLiquidationGameCard } from '@/components/coinflip/game-card/PublicLiquidationGameCard';
import { ResolveGameCard } from '@/components/coinflip/game-card/ResolveGameCard';
import { GameCardMode } from '@/components/coinflip/game-card/types';
import { VictoryGameCard } from '@/components/coinflip/game-card/VictoryGameCard';
import { UiButton } from '@/components/ui';
import { GamesDisplayMode } from '@/constants/coinflip';
import { useAddress, useMediaQueries } from '@/hooks';
import { useGames } from '@/hooks/coinflip';
import { useAppSelector } from '@/state';
import { Game } from '@/typings/coinflip';
import { isHistoricalGame, isPositiveOutcomeGame } from '@/utils/coinflip';
import { numberToArray } from '@/utils/common';
import { FC } from 'react';
import styled from 'styled-components';

const GamesDisplay: FC = () => {
  const { is1300PxOrLess, is1024PxOrLess, is775PxOrLess, is515PxOrLess, is440PxOrLess } = useMediaQueries();
  const { paginationLimit } = useAppSelector((state) => state.coinflip);
  const userWalletAddress = useAddress();
  const {
    gamesDisplayMode,
    gamesWithBlanks,
    loadGames,
    isGamesEmpty,
    isGamesLoading,
    isFreshGamesLoading,
    canLoadMoreGames,
    isOngoingGame,
    isGameCreatedByUser,
    isGameAcceptedByUser,
  } = useGames();

  function displayCard(game: Game) {
    if (gamesDisplayMode === GamesDisplayMode.My) {
      if (isOngoingGame(game)) {
        if (isGameCreatedByUser(game)) return <ResolveGameCard game={game} mode={cardsDisplayMode} />;
        if (isGameAcceptedByUser(game)) return <AcceptedGameCard game={game} mode={cardsDisplayMode} />;
      }
    }

    if (gamesDisplayMode === GamesDisplayMode.PublicLiquidation) {
      return <PublicLiquidationGameCard game={game} mode={cardsDisplayMode} />;
    }

    if (isHistoricalGame(game)) {
      if (isPositiveOutcomeGame(game, userWalletAddress)) {
        return <VictoryGameCard game={game} mode={cardsDisplayMode} />;
      }
      return <LossGameCard game={game} mode={cardsDisplayMode} />;
    }

    return <PendingGameCard game={game} mode={cardsDisplayMode} />;
  }

  const cardsDisplayMode = ((): GameCardMode => {
    if (is440PxOrLess) return 'compact';
    if (is515PxOrLess) return 'default';
    if (is1300PxOrLess) return 'compact';
    return 'default';
  })();

  const cardsPerRow = (() => {
    if (is515PxOrLess) return 1;
    if (is775PxOrLess) return 2;
    if (is1024PxOrLess) return 3;
    if (is1300PxOrLess) return 4;
    return 3;
  })();

  return (
    <div>
      <GamesGridStyled cardsPerRow={cardsPerRow}>
        {!isFreshGamesLoading && !isGamesEmpty && (
          <>
            {gamesWithBlanks.map((game, index) => (
              <GameCardGhostStyled key={`ghost-game__${index}`}>
                {game && <GameCardWrapperStyled>{displayCard(game)}</GameCardWrapperStyled>}
              </GameCardGhostStyled>
            ))}
          </>
        )}

        {isGamesLoading &&
          numberToArray(paginationLimit).map((_, index) => (
            <LoadingGameCard key={`loading-game__${index}`} mode={cardsDisplayMode} />
          ))}
      </GamesGridStyled>

      {isGamesEmpty && !isGamesLoading && <EmptyGamesStyled>No games found</EmptyGamesStyled>}

      {canLoadMoreGames && (
        <LoadMoreStyled>
          <UiButton
            loading={isGamesLoading}
            type="primary"
            theme="alternative"
            size="large"
            shape="round"
            onClick={() => loadGames()}
          >
            Show more
          </UiButton>
        </LoadMoreStyled>
      )}
    </div>
  );
};

const GamesGridStyled = styled.div<{
  cardsPerRow: number;
}>`
  display: grid;
  grid-gap: 16px;
  grid-auto-rows: 1fr;

  ${({ cardsPerRow }) => `
    grid-template-columns: repeat(${cardsPerRow}, 1fr);
  `}
`;

const GameCardGhostStyled = styled.div`
  background: var(--dark-color-2);
  border-radius: 8px;
`;

const GameCardWrapperStyled = styled.div`
  animation: fadeIn 0.7s;
  animation-fill-mode: forwards;
`;

const EmptyGamesStyled = styled.div`
  background: var(--dark-color-4);
  padding: 32px;
  text-align: center;
  border-radius: 8px;

  @media screen and (max-width: 515px) {
    padding: 24px;
  }
`;

const LoadMoreStyled = styled.div`
  text-align: center;
  margin-top: 54px;

  @media screen and (max-width: 600px) {
    margin-top: 40px;
  }
`;

export default GamesDisplay;
