import { APP_DOMAIN } from '@/constants/app';
import { NetworkKey } from '@/constants/networks';

export const APP_SOCKET_ADDRESSES_MAP: Record<NetworkKey, string> = {
  [NetworkKey.TESTNET]: `wss://testnet.${APP_DOMAIN}:5000/websocket`,
  [NetworkKey.MAINNET]: `wss://mainnet.${APP_DOMAIN}:5000/websocket`,
};

export const APP_REST_API_ADDRESSES_MAP: Record<NetworkKey, string> = {
  [NetworkKey.TESTNET]: `https://testnet.${APP_DOMAIN}:5000/api`,
  [NetworkKey.MAINNET]: `https://mainnet.${APP_DOMAIN}:5000/api`,
};
