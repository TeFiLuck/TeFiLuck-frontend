import { NetworkKey } from '@/constants/networks';
import { Game, SortingConfiguration } from '@/typings/coinflip';
import { createHttp } from '../../core/http';
import { OPEN_GAMES_ENDPOINT } from '../constants';

export type OpenGamesParams = {
  networkKey: NetworkKey;
  skip?: number;
  limit?: number | null;
  excludeAddress?: string | null;
  assets?: Array<{
    denom: string;
    bet_size_from?: string | null;
    bet_size_to?: string | null;
  }> | null;
  resolveTimeLimitFrom?: number | null;
  resolveTimeLimitTo?: number | null;
  sortBy?: SortingConfiguration;
};

export type OpenGamesResponse = {
  bets: Game[];
  count: number;
};

export async function fetchOpenGames({
  networkKey,
  skip = 0,
  limit = null,
  excludeAddress = null,
  assets = null,
  resolveTimeLimitFrom = null,
  resolveTimeLimitTo = null,
  sortBy = { param: 'price', asc: true },
}: OpenGamesParams): Promise<OpenGamesResponse> {
  const response = await createHttp({ networkKey }).post(OPEN_GAMES_ENDPOINT, {
    skip: skip,
    limit,
    exclude_address: excludeAddress || null,
    assets,
    liquidation: {
      blocks_until_liquidation_from: resolveTimeLimitFrom,
      blocks_until_liquidation_to: resolveTimeLimitTo,
    },
    sort_by: {
      [sortBy.param]: {
        asc: sortBy.asc,
      },
    },
  });

  return response.data;
}
