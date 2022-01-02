import { GamesDisplayModeConfig, SortingConfiguration } from '@/typings/coinflip';
import { TokenSymbol } from './tokens';

export enum CoinSide {
  Heads = 0,
  Tails = 1,
}

export const DEFAULT_SELECTED_SIDE = CoinSide.Heads;

export const MIN_REQUIRED_AMOUNT_TO_CREATE_GAME_PER_TOKEN = <const>{
  [TokenSymbol.LUNA]: 0.01,
  [TokenSymbol.UST]: 1,
};

export const MAX_BET_SIZE = 1000000;

export enum GameOutcome {
  Liquidated = 'liquidated',
  Resolved = 'resolved',
}

export enum GamesDisplayMode {
  Open = 'openGames',
  My = 'myGames',
  PublicLiquidation = 'publicLiquidationGames',
  RecentHistory = 'recentHistoryGames',
}

export const GAMES_DISPLAY_MODES_CONFIGURATIONS: Record<GamesDisplayMode, GamesDisplayModeConfig> = <const>{
  [GamesDisplayMode.Open]: {
    label: 'Pending games',
    private: false,
    preload: false,
    paginatable: true,
    isGhostGapsAllowed: true,
    filters: {
      enabled: true,
    },
  },
  [GamesDisplayMode.My]: {
    label: 'My games',
    private: true,
    preload: true,
    paginatable: false,
    isGhostGapsAllowed: false,
    filters: {
      enabled: false,
    },
  },
  [GamesDisplayMode.PublicLiquidation]: {
    label: 'Public liquidation',
    private: false,
    preload: true,
    paginatable: true,
    isGhostGapsAllowed: true,
    filters: {
      enabled: true,
      currencies: false,
      betSizes: false,
      resolveTimeLimit: false,
      sorting: false,
      pagination: true,
    },
  },
  [GamesDisplayMode.RecentHistory]: {
    label: 'Recent history',
    private: true,
    preload: true,
    paginatable: true,
    isGhostGapsAllowed: false,
    filters: {
      enabled: true,
      currencies: false,
      betSizes: false,
      resolveTimeLimit: false,
      sorting: false,
      pagination: true,
    },
  },
};

export enum GamesSortingMethod {
  HighestFirst = 'highest_first',
  LowestFirst = 'lowest_first',
  NewestFirst = 'newest_first',
}

export const SORTING_CONFIGURATIONS: Record<GamesSortingMethod, SortingConfiguration> = <const>{
  [GamesSortingMethod.HighestFirst]: {
    param: 'price',
    asc: false,
  },
  [GamesSortingMethod.LowestFirst]: {
    param: 'price',
    asc: true,
  },
  [GamesSortingMethod.NewestFirst]: {
    param: 'creation',
    asc: false,
  },
};

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

export const GAMES_PAGINATION_LIMITS = [10, 20, 30, 50, 100];
export const DEFAULT_GAMES_PAGINATION_LIMIT = 10;
export const MIN_GAMES_GHOSTS_DISPLAY = 10;

export const DEFAULT_AMOUNT_BLOCKS_BEFORE_LIQUIDABLE = 1440; // 2 hours
export const MIN_BLOCKS_BEFORE_LIQUIDABLE = 360; // 30 minutes
export const MAX_BLOCKS_BEFORE_LIQUIDABLE = 17280; // 24 hours

export const ENCRYPTION_PASSWORD_SEPARATOR = '_';
export const ENCRYPTION_PASSWORD_MIN_LENGTH = 12;
export const GENERATED_ENCRYPTION_PASSWORD_LENGTH = 255;

export const PRIVATE_LIQUIDATION_TIME_LIMIT_BLOCKS = 120; // 10 minutes
export const PLATFORM_LIQUIDATION_FEE_PERCENT = 2;
export const PLATFORM_GAME_FEE_PERCENT = 0;
export const GUARANTEED_RESOLVED_GAME_PROFIT_PERCENTAGE = 100 - PLATFORM_GAME_FEE_PERCENT;
export const LIQUIDATOR_FEE_PERCENT = 4;
export const MAX_LIQUIDATION_PROFIT_PERCENTAGE = 100 - PLATFORM_LIQUIDATION_FEE_PERCENT;
export const GUARANTEED_LIQUIDATION_PROFIT_PERCENTAGE = 100 - LIQUIDATOR_FEE_PERCENT - PLATFORM_LIQUIDATION_FEE_PERCENT;
