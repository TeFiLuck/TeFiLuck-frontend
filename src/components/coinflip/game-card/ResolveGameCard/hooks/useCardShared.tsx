import styled from 'styled-components';
import { displayResolveTimeLimit, shortenAddress } from '../../utils';
import { ResolveGameCardProps } from '../types';

export function useCardShared(props: ResolveGameCardProps) {
  const { game } = props;

  const cardTitle = `YOU VS ${shortenAddress('terra...dsm')}`;
  const cardStatus = 'ONGOING';

  const canBeLiquidated = false;

  const signText = (
    <span>
      Resolve time: <br />
      &#8776; {displayResolveTimeLimit(game.blocks_until_liquidation)}
    </span>
  );

  const tooltipContent =
    'To complete game, you must resolve it with your password. If you fail to do so in specified time-limit, you might get liquidated.';

  const gameInfoContents = [
    {
      label: 'Started at',
      value: '22367666',
      tooltip: 'Block number when your opponent responded on game',
    },
    {
      label: 'Liquidatable at',
      value: '22367666',
      tooltip: 'If you won\'t resolve the game, you might get liquidated starting from this Terra block number',
    },
    {
      label: 'Till liquidatable',
      value: <span className="text-color-primary">&#8776;01:54:00</span>,
      tooltip: '',
    },
  ];

  const liquidationIndicatorContent = (
    <LiquidationStatusTextStyled liquidatable={canBeLiquidated}>
      {canBeLiquidated ? 'Can be liquidated' : 'Can\'t be liquidated'}
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
