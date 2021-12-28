import { NetworkKey } from '@/constants/networks';
import { Game } from '@/typings/coinflip';
import { createHttp } from '../../core/http';
import { RECENT_HISTORY_GAMES_ENDPOINT } from '../constants';

export type RecentHistoryGamesParams = {
  networkKey: NetworkKey;
  address: string;
  skip?: number;
  limit?: number;
};

export type RecentHistoryGamesResponse = {
  history: Game[];
};

export async function fetchRecentHistoryGames({
  networkKey,
  address,
  skip = 0,
  limit = 100,
}: RecentHistoryGamesParams): Promise<RecentHistoryGamesResponse> {
  const response = await createHttp({ networkKey }).get(RECENT_HISTORY_GAMES_ENDPOINT, {
    params: {
      skip,
      limit,
      address,
    },
  });

  return response.data;
}
