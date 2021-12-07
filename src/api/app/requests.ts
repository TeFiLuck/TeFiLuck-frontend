import { BLOCKCHAIN_UPDATES_SOCKET_ADDRESSES_MAP } from '@/constants/app';
import { NetworkKey } from '@/constants/networks';

export function connectToBlockchainUpdatesWS(networkKey: NetworkKey): WebSocket {
  const wsAddress = BLOCKCHAIN_UPDATES_SOCKET_ADDRESSES_MAP[networkKey];
  return new WebSocket(wsAddress);
}
