export const OPEN_GAMES_ENDPOINT = '/coinflip/bets/pending';
export const MY_GAMES_ENDPOINT = (address: string) => `/coinflip/mybets/${address}`;
export const PUBLIC_LIQUIDATION_GAMES_ENDPOINT = '/coinflip/bets/liquidatable';
export const RECENT_HISTORY_GAMES_ENDPOINT = '/coinflip/mybets/history';
