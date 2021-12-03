export type GameCardMode = 'default' | 'compact';
import { FC } from 'react';

export type CardsVariationsMap = {
  [key in GameCardMode]: FC;
};

export interface GameCardProps {
  mode?: GameCardMode;
}
