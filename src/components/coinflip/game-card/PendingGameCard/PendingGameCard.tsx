import { FC } from 'react';
import { CardsVariationsMap } from '../types';
import CompactModeCard from './components/CompactMode/CompactMode';
import DefaultModeCard from './components/DefaultMode/DefaultMode';
import { PendingGameCardProps } from './types';

export const PendingGameCard: FC<PendingGameCardProps> = ({ mode = 'default', ...restProps }) => {
  const cardsMap: CardsVariationsMap = {
    default: DefaultModeCard,
    compact: CompactModeCard,
  };

  const GameCard = cardsMap[mode];

  return <GameCard {...restProps} />;
};
