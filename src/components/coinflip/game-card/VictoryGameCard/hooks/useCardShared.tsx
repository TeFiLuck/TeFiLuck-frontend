import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { APP_SUCCESS_COLOR } from '@/assets/styles/design';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideColor, getCoinSideIcon } from '@/utils/coinflip';
import { QuestionOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AmountDisplay } from '../../shared';
import { VictoryGameCardProps } from '../types';

export function useCardShared({ opponentLiquidated, performedLiquidation }: VictoryGameCardProps) {
  const mySideChoice = CoinSide.Heads;
  const MyChoiceIcon = getCoinSideIcon(mySideChoice);
  const myChoiceColor = getCoinSideColor(mySideChoice);

  const opponentChoice = CoinSide.Tails;
  const OpponentChoiceIcon = getCoinSideIcon(opponentChoice);
  const opponentChoiceColor = getCoinSideColor(opponentChoice);

  function getCardTitle(): string {
    if (performedLiquidation) return 'terra...mnj VS terra...dsm';
    return 'YOU VS terra...dsm';
  }

  function getCardStatus(): string {
    if (opponentLiquidated) return 'Opponent liquidated';
    if (performedLiquidation) return 'Performed liquidation';
    return 'Victory';
  }

  function getCardSignText(): string {
    if (opponentLiquidated) return 'Profit: 90% + 7%';
    if (performedLiquidation) return 'Profit: 7% of bet size';
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

  const amountDisplay = <AmountDisplay amount="+10000" ticker="LUNA" logo={<LunaLogo />} color={APP_SUCCESS_COLOR} />;

  const transactionLink = '/';

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
    transactionLink,
    CardStatusStyled,
  };
}

const CardStatusStyled = styled.span`
  text-transform: uppercase;
  color: var(--global-success-color);
`;
