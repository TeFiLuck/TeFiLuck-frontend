import { UiSkeleton } from '@/components/ui';
import { useCurrentBlockNumber } from '@/hooks';
import { OngoingGame } from '@/typings/coinflip';
import styled from 'styled-components';
import { BlocksTimer } from '../../shared';
import { displayBlocksTimeLimit, shortenAddress } from '../../utils';
import { ResolveGameCardProps } from '../types';

export function useCardShared(props: ResolveGameCardProps) {
  const { currentBlockNumber, isCurrentBlockNumberLoading } = useCurrentBlockNumber();
  const game = props.game as OngoingGame;

  const cardTitle = `YOU VS ${shortenAddress(game.responder)}`;
  const cardStatus = 'ONGOING';

  const canBeLiquidated = currentBlockNumber >= game.liquidation_block;

  const signText = (
    <span>
      Resolve time: <br />
      &#8776; {displayBlocksTimeLimit(game.blocks_until_liquidation)}
    </span>
  );

  const tooltipContent =
    'To complete game, you must resolve it with your password. If you fail to do so in specified time-limit, you might get liquidated.';

  const gameInfoContents = [
    {
      label: 'Started at',
      value: game.started_at_block,
      tooltip: 'Block number when your opponent responded on game',
    },
    {
      label: 'Liquidatable at',
      value: game.liquidation_block,
      tooltip: 'If you won\'t resolve the game, you might get liquidated starting from this Terra block number',
    },
    {
      label: 'Till liquidatable',
      value: (
        <>
          {isCurrentBlockNumberLoading ? (
            <UiSkeleton width="70px" height="12px" />
          ) : (
            <span className="text-color-primary">
              <BlocksTimer current={currentBlockNumber} end={game.liquidation_block} />
            </span>
          )}
        </>
      ),
      tooltip: '',
    },
  ];

  const liquidationIndicatorContent = (
    <LiquidationStatusTextStyled liquidatable={canBeLiquidated}>
      {isCurrentBlockNumberLoading ? (
        <UiSkeleton width="100px" height="10px" />
      ) : canBeLiquidated ? (
        'Can be liquidated'
      ) : (
        'Can\'t be liquidated'
      )}
    </LiquidationStatusTextStyled>
  );

  const footerContent = (
    <span className="noselect" style={{ fontSize: '10px' }}>
      Resolve game to get result
    </span>
  );

  return {
    cardTitle,
    cardStatus,
    canBeLiquidated,
    signText,
    tooltipContent,
    gameInfoContents,
    footerContent,
    liquidationIndicatorContent,
  };
}

const LiquidationStatusTextStyled = styled.div<{
  liquidatable: boolean;
}>`
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 10px;

  ${({ liquidatable }) =>
    liquidatable
      ? `
    color: var(--global-danger-color);
  `
      : `
    color: var(--global-success-color);
  `}
`;
