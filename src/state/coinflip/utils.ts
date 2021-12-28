import { GamesDisplayMode, MIN_GAMES_GHOSTS_DISPLAY } from '@/constants/coinflip';
import { Game } from '@/typings/coinflip';
import { numberToArray } from '@/utils/common';

export function generateInitialGamesState(): Record<GamesDisplayMode, (Game | null)[]> {
  return {
    [GamesDisplayMode.Open]: numberToArray(MIN_GAMES_GHOSTS_DISPLAY).map(() => null),
    [GamesDisplayMode.My]: numberToArray(MIN_GAMES_GHOSTS_DISPLAY).map(() => null),
    [GamesDisplayMode.PublicLiquidation]: numberToArray(MIN_GAMES_GHOSTS_DISPLAY).map(() => null),
    [GamesDisplayMode.RecentHistory]: numberToArray(MIN_GAMES_GHOSTS_DISPLAY).map(() => null),
  };
}
