import { GameCardProps } from '../types';

export interface PendingGameCardProps extends GameCardProps {
  isCurrentUserCreatorOfGame?: boolean;
}
