import { FC } from 'react';
import { CardsVariationsMap } from '../types';
import CompactModeCard from './components/CompactMode/CompactMode';
import DefaultModeCard from './components/DefaultMode/DefaultMode';
import { VictoryGameCardProps } from './types';

export const VictoryGameCard: FC<VictoryGameCardProps> = ({ mode = 'default', ...restProps }) => {
  const cardsMap: CardsVariationsMap = {
    default: DefaultModeCard,
    compact: CompactModeCard,
  };

  const GameCard = cardsMap[mode];

  return <GameCard {...restProps} />;
};
