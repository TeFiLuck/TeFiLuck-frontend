import { APP_SUCCESS_COLOR } from '@/assets/styles/design';
import { CoinSide } from '@/constants/coinflip';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { getCoinSideColor, getCoinSideIcon } from '@/utils/coinflip';
import { QuestionOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AmountDisplay, FooterLink } from '../../shared';
import { shortenAddress } from '../../utils';
import { VictoryGameCardProps } from '../types';

export function useCardShared({ opponentLiquidated, performedLiquidation, game }: VictoryGameCardProps) {
  const mySideChoice = CoinSide.Heads;
  const MyChoiceIcon = getCoinSideIcon(mySideChoice);
  const myChoiceColor = getCoinSideColor(mySideChoice);

  const opponentChoice = CoinSide.Tails;
  const OpponentChoiceIcon = getCoinSideIcon(opponentChoice);
  const opponentChoiceColor = getCoinSideColor(opponentChoice);

  function getCardTitle(): string {
    if (performedLiquidation) return `${shortenAddress('terra...mnj')} VS ${shortenAddress('terra...dsm')}`;
    return `YOU VS ${shortenAddress('terra...dsm')}`;
  }

  function getCardStatus(): string {
    if (opponentLiquidated) return 'Opponent liquidated';
    if (performedLiquidation) return 'Performed liquidation';
    return 'Victory';
  }

  function getCardSignText(): string {
    if (opponentLiquidated) return 'Profit: 90% + 7%';
    if (performedLiquidation) return 'Profit: 7% of pot size';
    return 'Thank you for using TeFiLuck';
  }

  function getOpponentChoiceIcon() {
    if (opponentLiquidated || performedLiquidation) return <QuestionOutlined />;
    return <OpponentChoiceIcon />;
  }

  function getOpponentChoiceIconColor() {
    if (opponentLiquidated || performedLiquidation) return 'rgba(0,0,0,0.5)';
    return opponentChoiceColor;
  }

  function getOpponentChoiceBorderColor() {
    if (opponentLiquidated || performedLiquidation) return 'transparent';
    return opponentChoiceColor;
  }

  const signText = (
    <span>
      GG WP! <br />
      {getCardSignText()}
    </span>
  );

  const amountDisplay = (
    <AmountDisplay tokenSymbol={game.asset.denom} uAmount={game.asset.amount} color={APP_SUCCESS_COLOR} />
  );

  const footerLink = <FooterLink url={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} text="Game rules" />;

  return {
    MyChoiceIcon,
    myChoiceColor,
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
