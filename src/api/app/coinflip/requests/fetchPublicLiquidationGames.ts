import { NetworkKey } from '@/constants/networks';
import { Game } from '@/typings/coinflip';
import { createHttp } from '../../core/http';
import { PUBLIC_LIQUIDATION_GAMES_ENDPOINT } from '../constants';

export type PublicLiquidationGamesParams = {
  networkKey: NetworkKey;
  skip?: number;
  limit?: number;
  excludeAddress?: string | null;
};

export type PublicLiquidationGamesResponse = Game[];

export async function fetchPublicLiquidationGames({
  networkKey,
  skip = 0,
  limit = 100,
  excludeAddress,
}: PublicLiquidationGamesParams): Promise<PublicLiquidationGamesResponse> {
  const response = await createHttp({ networkKey }).get(PUBLIC_LIQUIDATION_GAMES_ENDPOINT, {
    params: {
      skip,
      limit,
      exclude_address: excludeAddress || null,
    },
  });

  return response.data;
}
