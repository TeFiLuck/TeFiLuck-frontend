import { AppAPI } from '@/api/app';
import { MAX_CONNECT_BLOCKCHAIN_UPDATES_SOCKET_RETRIES } from '@/constants/app';
import { useNetwork } from '@/hooks';
import { BlockchainUpdatesDistributor } from '@/logic/events';
import { useAppDispatch } from '@/state';
import { printError, setIsBlockchainUpdatesSocketConnected } from '@/state/app';
import { useEffect, useState } from 'react';

export function useBlockchainUpdates() {
  const dispatch = useAppDispatch();
  const [connectRetries, setConnectRetries] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { networkKey } = useNetwork();

  useEffect(() => {
    socket?.close();
    initNewSocketConnection();
    return () => socket?.close();
  }, [networkKey]);

  function initNewSocketConnection(): void {
    const newSocket = AppAPI.core.connectToBlockchainUpdatesWS(networkKey);

    newSocket.onopen = function handleSocketOpen() {
      dispatch(setIsBlockchainUpdatesSocketConnected(true));
      setConnectRetries(0);
    };

    newSocket.onclose = function handleSocketClose() {
      dispatch(setIsBlockchainUpdatesSocketConnected(false));
    };

    newSocket.onerror = function handleSocketError(e) {
      dispatch(setIsBlockchainUpdatesSocketConnected(false));

      if (connectRetries < MAX_CONNECT_BLOCKCHAIN_UPDATES_SOCKET_RETRIES) {
        dispatch(
          printError({
            title: 'Failed to establish connection',
            description: 'You might not receive LIVE updates, check Internet connection and try reload the page',
          }),
        );
      } else {
        initNewSocketConnection();
        setConnectRetries(connectRetries + 1);
      }
    };

    newSocket.onmessage = function handleSocketMessage(event) {
      BlockchainUpdatesDistributor.handle(JSON.parse(event.data));
    };

    setSocket(newSocket);
  }
}
