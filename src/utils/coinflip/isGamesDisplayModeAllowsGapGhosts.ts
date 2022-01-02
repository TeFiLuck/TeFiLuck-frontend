import { GamesDisplayMode, GAMES_DISPLAY_MODES_CONFIGURATIONS } from '@/constants/coinflip';

export function isGamesDisplayModeAllowsGapGhosts(mode: GamesDisplayMode): boolean {
  return GAMES_DISPLAY_MODES_CONFIGURATIONS[mode].isGhostGapsAllowed;
}
