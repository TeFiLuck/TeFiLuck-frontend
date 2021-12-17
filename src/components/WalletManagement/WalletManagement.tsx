import { UiButton } from '@/components/ui';
import { useAddress, useConnectedWallet, useTokens } from '@/hooks';
import * as format from '@/utils/format';
import { WalletOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';
import WalletManagementDropdown from './components/WalletManagementDropdown/WalletManagementDropdown';

type Size = 'medium' | 'small';

export interface WalletConnectButtonProps {
  dropdownFixed?: boolean;
  size?: Size;
}

const WalletConnectButton: FC<WalletConnectButtonProps> = ({ dropdownFixed = false, size = 'medium' }) => {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const overlayStyle: Record<string, string> = {};
  if (dropdownFixed) overlayStyle.position = 'fixed';

  const { isWalletConnected } = useConnectedWallet();
  const buttonType = isWalletConnected ? 'default' : 'primary';
  const address = useAddress();
  const { mainToken } = useTokens();

  const isWalletAddressVisible = size !== 'small';

  return (
    <Dropdown
      overlay={<WalletManagementDropdown setDropdownVisibility={setDropdownVisibility} />}
      placement="bottomRight"
      overlayStyle={overlayStyle}
      trigger={['click']}
      visible={isDropdownVisible}
      onVisibleChange={(isVisible) => setDropdownVisibility(isVisible)}
    >
      <UiButton type={buttonType} shape="round">
        {isWalletConnected ? (
          <Space>
            <Space size={4} className="text-color-white">
              <WalletOutlined />
              {isWalletAddressVisible && format.shortenStr(address, 6, 6)}
            </Space>

            {isWalletAddressVisible && <span className="text-color-primary">|</span>}

            <BalanceDisplayStyled size={size}>
              {format.cutDecimals(mainToken.balance, 3)} {mainToken.ticker}
            </BalanceDisplayStyled>
          </Space>
        ) : (
          'Connect Wallet'
        )}
      </UiButton>
    </Dropdown>
  );
};

const BalanceDisplayStyled = styled.div<{
  size: Size;
}>`
  color: var(--global-primary-color);

  ${({ size }) => `
    ${
  size === 'small'
    ? `
      font-size: 10px;
      line-height: 10px;
    `
    : ''
}
  `}
`;

export default WalletConnectButton;
