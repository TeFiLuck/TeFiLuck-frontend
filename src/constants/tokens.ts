import KRT_LOGO from '@/assets/images/tokens/KRT.svg';
import LUNA_LOGO from '@/assets/images/tokens/LUNA.svg';
import MNT_LOGO from '@/assets/images/tokens/MNT.svg';
import SDT_LOGO from '@/assets/images/tokens/SDT.svg';
import UST_LOGO from '@/assets/images/tokens/UST.svg';

export enum TokenSymbol {
  LUNA = 'LUNA',
  UST = 'UST',
  KRT = 'KRT',
  SDT = 'SDT',
  MNT = 'MNT',
}

export const TOKENS_LOGOS = <const>{
  [TokenSymbol.LUNA]: LUNA_LOGO,
  [TokenSymbol.UST]: UST_LOGO,
  [TokenSymbol.KRT]: KRT_LOGO,
  [TokenSymbol.SDT]: SDT_LOGO,
  [TokenSymbol.MNT]: MNT_LOGO,
};

export const TOKENS_DENOMS = <const>{
  [TokenSymbol.LUNA]: 'uluna',
  [TokenSymbol.UST]: 'uusd',
  [TokenSymbol.KRT]: 'ukrw',
  [TokenSymbol.SDT]: 'usdr',
  [TokenSymbol.MNT]: 'umnt',
};

export const TERRA_NATIVE_TOKENS = <const>[
  TokenSymbol.LUNA,
  TokenSymbol.UST,
  TokenSymbol.KRT,
  TokenSymbol.SDT,
  TokenSymbol.MNT,
];
