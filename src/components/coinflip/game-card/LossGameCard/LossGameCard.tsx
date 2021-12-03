import { FC } from 'react';
import { CardsVariationsMap } from '../types';
import CompactModeCard from './components/CompactMode/CompactMode';
import DefaultModeCard from './components/DefaultMode/DefaultMode';
import { LossGameCardProps } from './types';

export const LossGameCard: FC<LossGameCardProps> = ({ mode = 'default', ...restProps }) => {
  const cardsMap: CardsVariationsMap = {
    default: DefaultModeCard,
    compact: CompactModeCard,
  };

  const GameCard = cardsMap[mode];

  return <GameCard {...restProps} />;
};
