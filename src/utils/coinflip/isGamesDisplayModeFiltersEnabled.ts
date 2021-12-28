import { GamesDisplayMode, GAMES_DISPLAY_MODES_CONFIGURATIONS } from '@/constants/coinflip';

export function isGamesDisplayModeFiltersEnabled(mode: GamesDisplayMode): boolean {
  return GAMES_DISPLAY_MODES_CONFIGURATIONS[mode].filters.enabled;
}
