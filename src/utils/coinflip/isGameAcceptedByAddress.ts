import { Game } from '@/typings/coinflip';

export function isGameAcceptedByAddress(game: Game, address: string): boolean {
  if (!('responder' in game)) return false;
  return (game as Game & { responder: string }).responder === address;
}
