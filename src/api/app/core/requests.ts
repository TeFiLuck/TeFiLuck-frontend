import { NetworkKey } from '@/constants/networks';
import { APP_SOCKET_ADDRESSES_MAP } from './constants';

export function connectToBlockchainUpdatesWS(networkKey: NetworkKey): WebSocket {
  const wsAddress = APP_SOCKET_ADDRESSES_MAP[networkKey];
  return new WebSocket(wsAddress);
}
