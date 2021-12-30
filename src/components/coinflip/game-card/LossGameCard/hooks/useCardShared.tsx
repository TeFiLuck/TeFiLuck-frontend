import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { HistoricalGame } from '@/typings/coinflip';
import {
  getCoinSideColor,
  getCoinSideIcon,
  getOppositeCoinSide,
  isGameAcceptedByAddress,
  isGameLiquidated,
} from '@/utils/coinflip';
import { QuestionOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AmountDisplay, FooterLink } from '../../shared';
import { shortenAddress } from '../../utils';
import { LossGameCardProps } from '../types';

export function useCardShared(props: LossGameCardProps) {
  const game = props.game as HistoricalGame;
  const isLiquidated = isGameLiquidated(game);

  const mySideChoice = game.responder_side;
  const MyChoiceIcon = getCoinSideIcon(mySideChoice);
  const myChoiceColor = getCoinSideColor(mySideChoice);

  const opponentSideChoice = isGameAcceptedByAddress(game, game.winner)
    ? mySideChoice
    : getOppositeCoinSide(mySideChoice);
  const OpponentChoiceIcon = getCoinSideIcon(opponentSideChoice);
  const opponentChoiceColor = getCoinSideColor(opponentSideChoice);

  const cardTitle = `YOU VS ${shortenAddress(game.winner)}`;

  function getCardStatus(): string {
    if (isLiquidated) return 'Liquidated';
    return 'Loss';
  }

  function getCardSignText() {
    if (isLiquidated) {
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
    if (isLiquidated) return <QuestionOutlined />;
    return <MyChoiceIcon />;
  }

  function getMyChoiceIconColor() {
    if (isLiquidated) return 'rgba(0,0,0,0.5)';
    return myChoiceColor;
  }

  function getMyChoiceBorderColor() {
    if (isLiquidated) return 'transparent';
    return myChoiceColor;
  }

  const lossAmount = ((): string => {
    return `-${Number(game.asset.amount) / 2}`;
  })();

  const amountDisplay = <AmountDisplay tokenSymbol={game.asset.denom} uAmount={lossAmount} color={APP_DANGER_COLOR} />;

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
