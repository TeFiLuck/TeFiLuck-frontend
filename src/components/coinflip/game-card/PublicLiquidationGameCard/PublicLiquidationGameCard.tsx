import { FC } from 'react';
import { CardsVariationsMap } from '../types';
import CompactModeCard from './components/CompactMode/CompactMode';
import DefaultModeCard from './components/DefaultMode/DefaultMode';
import { PublicLiquidationGameCardProps } from './types';

export const PublicLiquidationGameCard: FC<PublicLiquidationGameCardProps> = ({ mode = 'default', ...restProps }) => {
  const cardsMap: CardsVariationsMap = {
    default: DefaultModeCard,
    compact: CompactModeCard,
  };

  const GameCard = cardsMap[mode];

  return <GameCard {...restProps} />;
};
