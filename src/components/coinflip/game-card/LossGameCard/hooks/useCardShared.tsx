import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideColor, getCoinSideIcon } from '@/utils/coinflip';
import { QuestionOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AmountDisplay } from '../../shared';
import { LossGameCardProps } from '../types';

export function useCardShared({ liquidated }: LossGameCardProps) {
  const mySideChoice = CoinSide.Heads;
  const MyChoiceIcon = getCoinSideIcon(mySideChoice);
  const myChoiceColor = getCoinSideColor(mySideChoice);

  const opponentSideChoice = CoinSide.Heads;
  const OpponentChoiceIcon = getCoinSideIcon(opponentSideChoice);
  const opponentChoiceColor = getCoinSideColor(opponentSideChoice);

  const cardTitle = 'YOU VS terra...dsm';

  function getCardStatus(): string {
    if (liquidated) return 'Liquidated';
    return 'Loss';
  }

  function getCardSignText() {
    if (liquidated) {
      return (
        <span>
          Your resolve time expired
          <br />
          And you have been liquidated
        </span>
      );
    }

    return (
      <span>
        Better luck next time
        <br />
        Thank you for using TeFiLuck
      </span>
    );
  }

  function getMyChoiceIcon() {
    if (liquidated) return <QuestionOutlined />;
    return <MyChoiceIcon />;
  }

  function getMyChoiceIconColor() {
    if (liquidated) return 'rgba(0,0,0,0.5)';
    return myChoiceColor;
  }

  function getMyChoiceBorderColor() {
    if (liquidated) return 'transparent';
    return myChoiceColor;
  }

  const amountDisplay = <AmountDisplay amount="-10000" symbol="LUNA" logo={<LunaLogo />} color={APP_DANGER_COLOR} />;

  const transactionLink = '/';

  return {
    OpponentChoiceIcon,
    opponentChoiceColor,
    cardTitle,
    getCardStatus,
    getCardSignText,
    getMyChoiceIcon,
    getMyChoiceIconColor,
    getMyChoiceBorderColor,
    amountDisplay,
    transactionLink,
    CardStatusStyled,
  };
}

const CardStatusStyled = styled.span`
  text-transform: uppercase;
  color: var(--global-danger-color);
`;
