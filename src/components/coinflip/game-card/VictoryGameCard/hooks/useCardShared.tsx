import { APP_SUCCESS_COLOR } from '@/assets/styles/design';
import {
  GUARANTEED_LIQUIDATION_PROFIT_PERCENTAGE,
  GUARANTEED_RESOLVED_GAME_PROFIT_PERCENTAGE,
  LIQUIDATOR_FEE_PERCENT,
  MAX_LIQUIDATION_PROFIT_PERCENTAGE,
} from '@/constants/coinflip';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { useAddress } from '@/hooks';
import { HistoricalGame } from '@/typings/coinflip';
import {
  getCoinSideColor,
  getCoinSideIcon,
  getOppositeCoinSide,
  isGameAcceptedByAddress,
  isGameLiquidated,
  isGameLiquidatedByAddress,
} from '@/utils/coinflip';
import { QuestionOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AmountDisplay, FooterLink } from '../../shared';
import { shortenAddress } from '../../utils';
import { VictoryGameCardProps } from '../types';

export function useCardShared(props: VictoryGameCardProps) {
  const game = props.game as HistoricalGame;
  const userAddress = useAddress();

  const isUserLiquidatedOpponent =
    isGameAcceptedByAddress(game, userAddress) && isGameLiquidatedByAddress(game, userAddress);
  const isUserPerformedPublicLiquidation =
    !isGameAcceptedByAddress(game, userAddress) && isGameLiquidatedByAddress(game, userAddress);
  const isGamePubliclyLiquidated = isGameLiquidated(game) && !isGameLiquidatedByAddress(game, userAddress);

  const mySideChoice = isGameAcceptedByAddress(game, userAddress)
    ? game.responder_side
    : getOppositeCoinSide(game.responder_side);
  const MyChoiceIcon = (() => {
    if (isUserPerformedPublicLiquidation) return QuestionOutlined;
    return getCoinSideIcon(mySideChoice);
  })();
  const myChoiceIconColor = (() => {
    if (isUserPerformedPublicLiquidation) return 'rgba(0,0,0,0.5)';
    return getCoinSideColor(mySideChoice);
  })();
  const myChoiceBorderColor = (() => {
    if (isUserPerformedPublicLiquidation) return 'transparent';
    return getCoinSideColor(mySideChoice);
  })();

  const opponentChoiceWhenResolved = getOppositeCoinSide(mySideChoice);

  function getCardTitle(): string {
    if (isUserPerformedPublicLiquidation) {
      return `${shortenAddress(game.owner)} VS ${shortenAddress(game.responder)}`;
    }

    const opponentAddress = isGameAcceptedByAddress(game, userAddress) ? game.owner : game.responder;
    return `YOU VS ${shortenAddress(opponentAddress)}`;
  }

  function getCardStatus(): string {
    if (isUserLiquidatedOpponent || isUserPerformedPublicLiquidation) return 'Performed liquidation';
    if (isGamePubliclyLiquidated) return 'Opponent liquidated';
    return 'Victory';
  }

  function getCardSignText(): string {
    if (isUserLiquidatedOpponent) {
      return `Outcome: ${GUARANTEED_LIQUIDATION_PROFIT_PERCENTAGE}% + ${LIQUIDATOR_FEE_PERCENT}% of pot size`;
    }

    if (isGamePubliclyLiquidated) {
      return `Outcome: ${GUARANTEED_LIQUIDATION_PROFIT_PERCENTAGE}% of pot size`;
    }

    if (isUserPerformedPublicLiquidation) {
      return `Outcome: ${LIQUIDATOR_FEE_PERCENT}% of pot size`;
    }

    return `Outcome: ${GUARANTEED_RESOLVED_GAME_PROFIT_PERCENTAGE}% of pot size`;
  }

  function getOpponentChoiceIcon() {
    if (isGameLiquidated(game)) return <QuestionOutlined />;
    const OpponentChoiceIcon = getCoinSideIcon(opponentChoiceWhenResolved);
    return <OpponentChoiceIcon />;
  }

  function getOpponentChoiceIconColor() {
    if (isGameLiquidated(game)) return 'rgba(0,0,0,0.5)';
    return getCoinSideColor(opponentChoiceWhenResolved);
  }

  function getOpponentChoiceBorderColor() {
    if (isGameLiquidated(game)) return 'transparent';
    return getCoinSideColor(opponentChoiceWhenResolved);
  }

  const signText = (
    <span>
      GG WP! <br />
      {getCardSignText()}
    </span>
  );

  const gainAmount = ((): string => {
    const potSize = Number(game.asset.amount);

    if (isUserLiquidatedOpponent) {
      return String((potSize / 100) * MAX_LIQUIDATION_PROFIT_PERCENTAGE);
    }

    if (isGamePubliclyLiquidated) {
      return String((potSize / 100) * GUARANTEED_LIQUIDATION_PROFIT_PERCENTAGE);
    }

    if (isUserPerformedPublicLiquidation) {
      return String((potSize / 100) * LIQUIDATOR_FEE_PERCENT);
    }

    return String((potSize / 100) * GUARANTEED_RESOLVED_GAME_PROFIT_PERCENTAGE);
  })();

  const amountDisplay = (
    <AmountDisplay tokenSymbol={game.asset.denom} uAmount={gainAmount} color={APP_SUCCESS_COLOR} withLeadingPlus />
  );

  const footerLink = <FooterLink url={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} text="Game rules" />;

  return {
    MyChoiceIcon,
    myChoiceIconColor,
    myChoiceBorderColor,
    getCardTitle,
    getCardStatus,
    getCardSignText,
    getOpponentChoiceIcon,
    getOpponentChoiceIconColor,
    getOpponentChoiceBorderColor,
    signText,
    amountDisplay,
    footerLink,
    CardStatusStyled,
  };
}

const CardStatusStyled = styled.span`
  text-transform: uppercase;
  color: var(--global-success-color);
`;
