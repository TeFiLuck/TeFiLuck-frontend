import { useAddress, useTokens } from '@/hooks';
import * as format from '@/utils/format';
import { WalletOutlined } from '@ant-design/icons';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { Button, Dropdown, Space } from 'antd';
import { FC, useState } from 'react';
import WalletManagementDropdown from './components/WalletManagementDropdown/WalletManagementDropdown';

export interface WalletConnectButtonProps {
  dropdownFixed?: boolean;
}

const WalletConnectButton: FC<WalletConnectButtonProps> = ({ dropdownFixed = false }) => {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const overlayStyle: Record<string, string> = {};
  if (dropdownFixed) overlayStyle.position = 'fixed';

  const connectedWallet = useConnectedWallet();
  const buttonType = connectedWallet ? 'default' : 'primary';
  const address = useAddress();
  const { mainToken } = useTokens();

  return (
    <Dropdown
      overlay={<WalletManagementDropdown setDropdownVisibility={setDropdownVisibility} />}
      placement="bottomRight"
      overlayStyle={overlayStyle}
      trigger={['click']}
      visible={isDropdownVisible}
      onVisibleChange={(isVisible) => setDropdownVisibility(isVisible)}
    >
      <Button type={buttonType} shape="round">
        {connectedWallet ? (
          <Space>
            <Space size={4} className="text-color-white">
              <WalletOutlined />
              {format.shortenStr(address, 6, 6)}
            </Space>
            <span className="text-color-primary">|</span>
            <span className="text-color-primary">
              {format.round(mainToken.balance, 3)} {mainToken.symbol}
            </span>
          </Space>
        ) : (
          'Connect Wallet'
        )}
      </Button>
    </Dropdown>
  );
};

export default WalletConnectButton;
