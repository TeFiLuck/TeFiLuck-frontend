import { TerraAPI } from '@/api/terra';
import { CoinSide } from '@/constants/coinflip';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { DEFAULT_FEES_TOKEN_SYMBOL } from '@/constants/finance-management';
import { useAddress, useConnectedWallet, useNetwork } from '@/hooks';
import { isGameCreatedByAddress } from '@/utils/coinflip';
import { FooterLink } from '../../shared';
import { displayBlocksTimeLimit, shortenAddress } from '../../utils';
import { PendingGameCardProps } from '../types';

export function useCardShared({ game }: PendingGameCardProps) {
  const userAddress = useAddress();
  const { network } = useNetwork();
  const { requestTransactionDispatch, connectedWallet } = useConnectedWallet();

  const isCurrentUserCreatorOfGame = isGameCreatedByAddress(game, userAddress);

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
      &#8776; {displayBlocksTimeLimit(game.blocks_until_liquidation)}
    </span>
  );

  const footerLink = <FooterLink url={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} text="Game rules" />;

  function acceptGame(side: CoinSide): void {
    if (connectedWallet) {
      requestTransactionDispatch({
        title: 'Accept game',
        executionAction: TerraAPI.coinflip.acceptGame({
          wallet: connectedWallet,
          feeTokenSymbol: DEFAULT_FEES_TOKEN_SYMBOL,
          sendTokens: [[game.asset.denom, TerraAPI.utils.fromUAmount(game.asset.amount)]],
          payload: {
            gameId: game.id,
            gameOwnerAddress: game.owner,
            side,
          },
        }),
      });
    }
  }

  function cancelGame(): void {
    if (connectedWallet) {
      requestTransactionDispatch({
        title: 'Cancel game',
        executionAction: TerraAPI.coinflip.cancelGame({
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
    isCurrentUserCreatorOfGame,
    getCardTitle,
    cardStatus,
    getTooltipContent,
    signText,
    footerLink,
    acceptGame,
    cancelGame,
  };
}
