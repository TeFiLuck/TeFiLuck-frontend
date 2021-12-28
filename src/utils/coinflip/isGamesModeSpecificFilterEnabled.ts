import { GamesDisplayMode, GAMES_DISPLAY_MODES_CONFIGURATIONS } from '@/constants/coinflip';
import { GamesDisplayModeConfig } from '@/typings/coinflip';
import { isGamesDisplayModeFiltersEnabled } from './isGamesDisplayModeFiltersEnabled';

export function isGamesModeSpecificFilterEnabled(
  mode: GamesDisplayMode,
  filterName: keyof GamesDisplayModeConfig['filters'],
): boolean {
  if (!isGamesDisplayModeFiltersEnabled(mode)) return false;

  if (GAMES_DISPLAY_MODES_CONFIGURATIONS[mode].filters[filterName] === undefined) return true;

  return GAMES_DISPLAY_MODES_CONFIGURATIONS[mode].filters[filterName] as boolean;
}
