import { WalletOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { FC } from 'react';
import WalletManagementDropdown from './components/WalletManagementDropdown/WalletManagementDropdown';

const WalletConnectButton: FC = () => {
  const isWalletConnected = false;
  const buttonType = isWalletConnected ? 'default' : 'primary';

  return (
    <Dropdown overlay={<WalletManagementDropdown />} placement="bottomRight" trigger={['click']}>
      <Button type={buttonType} shape="round">
        {isWalletConnected ? (
          <Space>
            <Space size={4} className="text-color-white">
              <WalletOutlined />
              terra1...a52dsm
            </Space>
            <span className="text-color-primary">|</span>
            <span className="text-color-primary">99.325 UST</span>
          </Space>
        ) : (
          'Connect Wallet'
        )}
      </Button>
    </Dropdown>
  );
};

export default WalletConnectButton;
