import { NetworkKey } from '@/constants/networks';
import { Game } from '@/typings/coinflip';
import { createHttp } from '../../core/http';
import { MY_GAMES_ENDPOINT } from '../constants';

export type MyGamesParams = {
  networkKey: NetworkKey;
  address: string;
};

export type MyGamesResponse = {
  pending: Game[];
  ongoing: Game[];
};

export async function fetchMyGames({ networkKey, address }: MyGamesParams): Promise<MyGamesResponse> {
  const response = await createHttp({ networkKey }).get(MY_GAMES_ENDPOINT(address));
  return response.data;
}
