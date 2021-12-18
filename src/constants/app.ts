import { NetworkKey } from '@/constants/networks';

export const APP_DOMAIN = 'tefiluck.games';

export const BLOCKCHAIN_UPDATES_SOCKET_ADDRESSES_MAP: Record<NetworkKey, string> = {
  [NetworkKey.TESTNET]: `wss://testnet.${APP_DOMAIN}:5000/websocket`,
  [NetworkKey.MAINNET]: `wss://mainnet.${APP_DOMAIN}:5000/websocket`,
};

export const MAX_CONNECT_BLOCKCHAIN_UPDATES_SOCKET_RETRIES = 5;

export const MENU_ITEMS = <const>[
  {
    label: 'Coinflip',
    to: '/',
    disabled: false,
  },
  {
    label: 'Fortune Wheel',
    to: '/fortune-wheel',
    disabled: true,
  },
  {
    label: 'Roulette',
    to: '/roulette',
    disabled: true,
  },
  {
    label: 'Roll the dice',
    to: '/dice',
    disabled: true,
  },
];
