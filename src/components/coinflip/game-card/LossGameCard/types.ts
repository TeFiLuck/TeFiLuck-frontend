import { GameCardProps } from '../types';

export interface LossGameCardProps extends GameCardProps {
  liquidated?: boolean;
}
