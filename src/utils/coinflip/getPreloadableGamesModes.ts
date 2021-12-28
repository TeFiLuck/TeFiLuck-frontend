import { GamesDisplayMode, GAMES_DISPLAY_MODES_CONFIGURATIONS } from '@/constants/coinflip';

export function getPreloadableGamesModes(): GamesDisplayMode[] {
  return Object.entries(GAMES_DISPLAY_MODES_CONFIGURATIONS)
    .filter(([mode, config]) => config.preload)
    .map(([mode]) => mode as GamesDisplayMode);
}
