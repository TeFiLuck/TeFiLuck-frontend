import { GameCardProps } from '../types';

export interface VictoryGameCardProps extends GameCardProps {
  opponentLiquidated?: boolean;
  performedLiquidation?: boolean;
}
