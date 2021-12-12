import KRT_LOGO from '@/assets/images/tokens/KRT.svg';
import LUNA_LOGO from '@/assets/images/tokens/LUNA.svg';
import MNT_LOGO from '@/assets/images/tokens/MNT.svg';
import SDT_LOGO from '@/assets/images/tokens/SDT.svg';
import UST_LOGO from '@/assets/images/tokens/UST.svg';

export enum TokenSymbol {
  LUNA = 'uluna',
  UST = 'uusd',
  KRT = 'ukrw',
  SDT = 'usdr',
  MNT = 'umnt',
}

export const TOKENS_TICKERS: Record<TokenSymbol, string> = {
  [TokenSymbol.LUNA]: 'LUNA',
  [TokenSymbol.UST]: 'UST',
  [TokenSymbol.KRT]: 'KRT',
  [TokenSymbol.SDT]: 'SDT',
  [TokenSymbol.MNT]: 'MNT',
};

export const DEFAULT_TERRA_TOKENS_DECIMALS = 6;

export const TOKENS_DECIMALS: { [key in TokenSymbol]?: number } = <const>{};

export const TOKENS_LOGOS = <const>{
  [TokenSymbol.LUNA]: LUNA_LOGO,
  [TokenSymbol.UST]: UST_LOGO,
  [TokenSymbol.KRT]: KRT_LOGO,
  [TokenSymbol.SDT]: SDT_LOGO,
  [TokenSymbol.MNT]: MNT_LOGO,
};

export const TERRA_NATIVE_TOKENS = <const>[
  TokenSymbol.LUNA,
  TokenSymbol.UST,
  TokenSymbol.KRT,
  TokenSymbol.SDT,
  TokenSymbol.MNT,
];
