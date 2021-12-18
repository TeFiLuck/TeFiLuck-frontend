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

export const MAX_BET_SIZE = 1000000;

export enum GamesDisplayMode {
  Open = 'open_games',
  My = 'my_games',
  PublicLiquidation = 'public_liquidation',
  RecentHistory = 'recent_history',
}

export enum GamesSortingMethod {
  HighestFirst = 'highest_first',
  LowestFirst = 'lowest_first',
  NewestFirst = 'newest_first',
}

export const GAMES_SORTING_METHODS: Record<GamesSortingMethod, { label: string }> = <const>{
  [GamesSortingMethod.LowestFirst]: {
    label: 'Lowest first',
  },
  [GamesSortingMethod.HighestFirst]: {
    label: 'Highest first',
  },
  [GamesSortingMethod.NewestFirst]: {
    label: 'Newest first',
  },
};

export const DEFAULT_GAMES_SORTING_METHOD = GamesSortingMethod.LowestFirst;

export const GAMES_PAGINATION_SIZES = [10, 20, 30, 50, 100];
export const DEFAULT_GAMES_PAGINATION_SIZE = 10;

export const DEFAULT_AMOUNT_BLOCKS_BEFORE_LIQUIDABLE = 1440; // 2 hours
export const MIN_BLOCKS_BEFORE_LIQUIDABLE = 360; // 30 minutes
export const MAX_BLOCKS_BEFORE_LIQUIDABLE = 17280; // 24 hours

export const ENCRYPTION_PASSWORD_SEPARATOR = '_';
export const ENCRYPTION_PASSWORD_MIN_LENGTH = 12;
export const GENERATED_ENCRYPTION_PASSWORD_LENGTH = 255;
