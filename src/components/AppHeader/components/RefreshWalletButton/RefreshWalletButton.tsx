import { UiButton } from '@/components/ui';
import { useBalances } from '@/hooks';
import { ReloadOutlined } from '@ant-design/icons';
import { useWallet } from '@terra-money/wallet-provider';
import { FC, useState } from 'react';

const RefreshWalletButton: FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { recheckStatus } = useWallet();
  const { updateBalances } = useBalances();
  const REFRESH_LOADING_TIME_MS = 3000;

  function refreshWalletData() {
    setIsRefreshing(true);
    recheckStatus();
    updateBalances();
    setTimeout(() => setIsRefreshing(false), REFRESH_LOADING_TIME_MS);
  }

  return <UiButton shape="circle" icon={<ReloadOutlined />} loading={isRefreshing} onClick={refreshWalletData} />;
};

export default RefreshWalletButton;
