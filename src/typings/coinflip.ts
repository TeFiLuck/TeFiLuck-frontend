import { TokenSymbol } from '@/constants/tokens';

export type BetSizesRange<T extends number | string> = {
  tokenSymbol: TokenSymbol;
  min: T;
  max: T;
};

export type SavedPasswordRecord = {
  gameId: string;
  password: string;
  address: string;
};

export type SortingConfiguration = {
  param: 'creation' | 'price';
  asc: boolean;
};

export type Game = {
  id: string;
  blocks_until_liquidation: number;
  asset: {
    denom: TokenSymbol;
    amount: string;
  };
  owner: string;
  created_at: number;
};

export type GamesDisplayModeConfig = {
  label: string;
  preload: boolean;
  paginatable: boolean;
  private: boolean;
  filters: {
    enabled: boolean;
    currencies?: boolean;
    betSizes?: boolean;
    resolveTimeLimit?: boolean;
    sorting?: boolean;
    pagination?: boolean;
  };
};
