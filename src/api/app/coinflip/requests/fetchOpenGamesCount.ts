import { NetworkKey } from '@/constants/networks';
import { createHttp } from '../../core/http';
import { OPEN_GAMES_COUNT_ENDPOINT } from '../constants';

export type GamesCountParams = {
  networkKey: NetworkKey;
};

export type GamesCountResponse = {
  count: number;
};

export async function fetchOpenGamesCount({ networkKey }: GamesCountParams): Promise<GamesCountResponse> {
  const response = await createHttp({ networkKey }).get(OPEN_GAMES_COUNT_ENDPOINT);
  return response.data;
}
