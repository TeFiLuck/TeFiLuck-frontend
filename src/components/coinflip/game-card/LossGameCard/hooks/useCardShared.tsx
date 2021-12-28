import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { CoinSide } from '@/constants/coinflip';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { getCoinSideColor, getCoinSideIcon } from '@/utils/coinflip';
import { QuestionOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AmountDisplay, FooterLink } from '../../shared';
import { shortenAddress } from '../../utils';
import { LossGameCardProps } from '../types';

export function useCardShared({ liquidated, game }: LossGameCardProps) {
  const mySideChoice = CoinSide.Heads;
  const MyChoiceIcon = getCoinSideIcon(mySideChoice);
  const myChoiceColor = getCoinSideColor(mySideChoice);

  const opponentSideChoice = CoinSide.Heads;
  const OpponentChoiceIcon = getCoinSideIcon(opponentSideChoice);
  const opponentChoiceColor = getCoinSideColor(opponentSideChoice);

  const cardTitle = `YOU VS ${shortenAddress('terra...dsm')}`;

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

  const amountDisplay = (
    <AmountDisplay tokenSymbol={game.asset.denom} uAmount={`-${game.asset.amount}`} color={APP_DANGER_COLOR} />
  );

  const footerLink = <FooterLink url={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} text="Game rules" />;

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
    footerLink,
    CardStatusStyled,
  };
}

const CardStatusStyled = styled.span`
  text-transform: uppercase;
  color: var(--global-danger-color);
`;
