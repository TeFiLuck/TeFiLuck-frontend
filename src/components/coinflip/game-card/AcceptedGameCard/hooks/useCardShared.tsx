import { TerraAPI } from '@/api/terra';
import { UiSkeleton } from '@/components/ui';
import {
  GUARANTEED_LIQUIDATION_PROFIT_PERCENTAGE,
  MAX_LIQUIDATION_PROFIT_PERCENTAGE,
  PRIVATE_LIQUIDATION_TIME_LIMIT_BLOCKS,
} from '@/constants/coinflip';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { useConnectedWallet, useCurrentBlockNumber } from '@/hooks';
import { OngoingGame } from '@/typings/coinflip';
import { getCoinSideColor, getCoinSideIcon } from '@/utils/coinflip';
import { BlocksTimer, FooterLink } from '../../shared';
import { displayBlocksTimeLimit, shortenAddress } from '../../utils';
import { AcceptedGameCardProps } from '../types';

export function useCardShared(props: AcceptedGameCardProps) {
  const { requestTransactionDispatch, connectedWallet } = useConnectedWallet();
  const { currentBlockNumber, isCurrentBlockNumberLoading } = useCurrentBlockNumber();
  const game = props.game as OngoingGame;

  const cardTitle = `YOU VS ${shortenAddress(game.owner)}`;
  const cardStatus = 'ONGOING';

  const canLiquidate = currentBlockNumber >= game.liquidation_block;

  const chosenSideColor = getCoinSideColor(game.responder_side);
  const ChosenSideIcon = getCoinSideIcon(game.responder_side);

  const signText = (
    <span>
      Resolve time: <br />
      &#8776; {displayBlocksTimeLimit(game.blocks_until_liquidation)}
    </span>
  );

  const tooltipContent = (
    <span>
      To complete game, your opponent should resolve it with his password. However if he fails to do so in resolve
      time-limit, you will be able to liquidate him and claim the profit.
      <br />
      Be aware, that after he fails to resolve game, you will have&nbsp;
      <b>
        {PRIVATE_LIQUIDATION_TIME_LIMIT_BLOCKS} blocks (&#8776;
        {displayBlocksTimeLimit(PRIVATE_LIQUIDATION_TIME_LIMIT_BLOCKS)}) &nbsp;
      </b>
      to liquidate him yourself to get max profit: <b>{MAX_LIQUIDATION_PROFIT_PERCENTAGE}% of pot size</b>.
      <br />
      <br />
      If you fail to liquidate him within specified time-limit, the game will be publicly liquidatable and you might end
      up getting <b>{GUARANTEED_LIQUIDATION_PROFIT_PERCENTAGE}% of pot size.</b>
    </span>
  );

  const gameInfoContents = [
    {
      label: 'Started at',
      value: game.started_at_block,
      tooltip: 'Block number when you have responded on game',
    },
    {
      label: 'Liquidatable at',
      value: game.liquidation_block,
      tooltip:
        'If game is not resolved, you will be able to liquidate your opponent starting from following block number',
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
    {
      label: 'Publicly liquidatable',
      value: game.responder_liquidation_blocks_gap,
      tooltip: `If game is not resolved and you will not liquidate it within available time-limit, any person will be able to liquidate the game. No worries, you will still get ${GUARANTEED_LIQUIDATION_PROFIT_PERCENTAGE}% of profit.`,
    },
  ];

  const footerLink = <FooterLink url={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} text="Game rules" />;

  function liquidateGame(): void {
    if (connectedWallet) {
      requestTransactionDispatch({
        title: 'Liquidate opponent',
        executionAction: TerraAPI.coinflip.liquidateGame({
          wallet: connectedWallet,
          sendTokens: [],
          payload: {
            gameId: game.id,
          },
        }),
      });
    }
  }

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
    liquidateGame,
  };
}
