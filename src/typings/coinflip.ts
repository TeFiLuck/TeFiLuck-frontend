import { CoinSide, GameOutcome } from '@/constants/coinflip';
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

export type OngoingGame = Game & {
  responder: string;
  responder_side: CoinSide;
  liquidation_block: number;
  responder_liquidation_blocks_gap: number;
  started_at_block: number;
  signature: string;
};

export type PubliclyLiquidatableGame = Game & {
  responder: string;
  responder_side: CoinSide;
  liquidation_block: number;
  responder_liquidation_blocks_gap: number;
  started_at_block: number;
  signature: string;
};

export type HistoricalGame = Game & {
  responder: string;
  winner: string;
  liquidator: string | null;
  responder_side: CoinSide;
  outcome: GameOutcome;
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
