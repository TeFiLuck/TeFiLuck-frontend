import { Game } from '@/typings/coinflip';

export function isGameCreatedByAddress(game: Game, address: string): boolean {
  return game.owner === address;
}
