import { Game } from '@/typings/coinflip';

export function isAddressInvolvedInGame(game: Game, address: string): boolean {
  const gameItem = game as Game & { liquidator: string; responder: string };

  return gameItem.owner === address || gameItem.responder === address || gameItem.liquidator === address;
}
