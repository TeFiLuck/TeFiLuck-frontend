import { GamesDisplayMode, GAMES_DISPLAY_MODES_CONFIGURATIONS } from '@/constants/coinflip';

export function isGamesDisplayModePrivate(mode: GamesDisplayMode): boolean {
  return GAMES_DISPLAY_MODES_CONFIGURATIONS[mode].private;
}
