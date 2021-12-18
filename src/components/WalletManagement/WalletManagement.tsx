import { UiButton } from '@/components/ui';
import { useAddress, useConnectedWallet, useTokens } from '@/hooks';
import * as format from '@/utils/format';
import { WalletOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';
import WalletManagementDropdown from './components/WalletManagementDropdown/WalletManagementDropdown';

type Size = 'medium' | 'small' | 'xsmall';

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

  const buttonShape = size !== 'xsmall' || !isWalletConnected ? 'round' : 'circle';
  const isWalletAddressVisible = size !== 'small' && size !== 'xsmall';
  const isMainTokenBalanceVisible = size !== 'xsmall';
  const isSeparatorVisible = isWalletAddressVisible && isMainTokenBalanceVisible;

  return (
    <Dropdown
      overlay={
        <WalletManagementDropdown
          isMainTokenBalanceDisplayed={isMainTokenBalanceVisible}
          setDropdownVisibility={setDropdownVisibility}
        />
      }
      placement="bottomRight"
      overlayStyle={overlayStyle}
      trigger={['click']}
      visible={isDropdownVisible}
      onVisibleChange={(isVisible) => setDropdownVisibility(isVisible)}
    >
      <UiButton type={buttonType} shape={buttonShape}>
        {isWalletConnected ? (
          <Space>
            <Space size={4} className="text-color-white">
              <WalletOutlined />
              {isWalletAddressVisible && format.shortenStr(address, 6, 6)}
            </Space>

            {isSeparatorVisible && <span className="text-color-primary">|</span>}

            {isMainTokenBalanceVisible && (
              <BalanceDisplayStyled size={size}>
                {format.cutDecimals(mainToken.balance, 3)} {mainToken.ticker}
              </BalanceDisplayStyled>
            )}
          </Space>
        ) : (
          <span>
            Connect&nbsp;
            {size === 'xsmall' ? <WalletOutlined /> : 'Wallet'}
          </span>
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
