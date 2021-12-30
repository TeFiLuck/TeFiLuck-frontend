import { TerraAPI } from '@/api/terra';
import { LIQUIDATOR_FEE_PERCENT, MAX_LIQUIDATION_PROFIT_PERCENTAGE } from '@/constants/coinflip';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { DEFAULT_FEES_TOKEN_SYMBOL } from '@/constants/finance-management';
import { useAddress, useConnectedWallet, useNetwork } from '@/hooks';
import { PubliclyLiquidatableGame } from '@/typings/coinflip';
import { isGameAcceptedByAddress } from '@/utils/coinflip';
import { FooterLink } from '../../shared';
import { shortenAddress } from '../../utils';
import { PublicLiquidationGameCardProps } from '../types';

export function useCardShared(props: PublicLiquidationGameCardProps) {
  const { network } = useNetwork();
  const { requestTransactionDispatch, connectedWallet } = useConnectedWallet();
  const game = props.game as PubliclyLiquidatableGame;
  const currentUserAddress = useAddress();

  const isUserParticipantOfGame = isGameAcceptedByAddress(game, currentUserAddress);

  const cardTitle = (() => {
    if (isUserParticipantOfGame) {
      return `YOU VS ${shortenAddress(game.owner)}`;
    }

    return `${shortenAddress(game.owner)} VS ${shortenAddress(game.responder)}`;
  })();

  const cardStatus = 'ONGOING';

  const signText = (() => {
    const outcomePercentage = isUserParticipantOfGame ? MAX_LIQUIDATION_PROFIT_PERCENTAGE : LIQUIDATOR_FEE_PERCENT;

    return (
      <span>
        Outcome: <br />
        {outcomePercentage}% of pot size
      </span>
    );
  })();

  const tooltipContent = (() => {
    if (isUserParticipantOfGame) { return `Hurry up to get max outcome: ${MAX_LIQUIDATION_PROFIT_PERCENTAGE}% of pot size!`; }
    return `You have a chance to perform liquidation! Just click liquidate and earn ${LIQUIDATOR_FEE_PERCENT}% from bet size. Such things happen when neither game creator resolved the game or participant liquidated his opponent.`;
  })();

  const gainAmount = ((): string => {
    if (isUserParticipantOfGame) return String((Number(game.asset.amount) / 100) * MAX_LIQUIDATION_PROFIT_PERCENTAGE);
    return String((Number(game.asset.amount) / 100) * LIQUIDATOR_FEE_PERCENT);
  })();

  const footerLink = <FooterLink url={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} text="Game rules" />;

  function liquidateGame(): void {
    if (connectedWallet) {
      requestTransactionDispatch({
        title: 'Public liquidation',
        executionAction: TerraAPI.coinflip.liquidateGame({
          wallet: connectedWallet,
          feeTokenSymbol: DEFAULT_FEES_TOKEN_SYMBOL,
          sendTokens: [],
          maxGas: network.fee.intermediateGas,
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
    signText,
    tooltipContent,
    footerLink,
    gainAmount,
    liquidateGame,
  };
}
