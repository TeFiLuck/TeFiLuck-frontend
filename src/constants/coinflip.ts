import { TokenSymbol } from './tokens';

export enum CoinSide {
  Heads,
  Tails,
}

export const DEFAULT_SELECTED_SIDE = CoinSide.Heads;

export const MIN_REQUIRED_AMOUNT_TO_CREATE_GAME_PER_TOKEN = <const>{
  [TokenSymbol.LUNA]: 0.01,
  [TokenSymbol.UST]: 1,
};
