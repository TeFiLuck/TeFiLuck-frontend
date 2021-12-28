import { Game } from '@/typings/coinflip';
import { FC } from 'react';

export type GameCardMode = 'default' | 'compact';

export type CardsVariationsMap = {
  [key in GameCardMode]: FC<any>;
};

export interface GameCardProps {
  game: Game;
  mode?: GameCardMode;
}
