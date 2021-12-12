import { ReactComponent as TerraStationExtensionIcon } from '@/assets/images/terra-station-extension.svg';
import { ReactComponent as TerraStationMobileIcon } from '@/assets/images/terra-station-mobile.svg';
import { UiLink } from '@/components/ui';
import { useConnectedWallet, useTokens } from '@/hooks';
import { useAppDispatch } from '@/state';
import { setMainTokenSymbol } from '@/state/finance-management';
import { Token } from '@/typings/finance-management';
import * as format from '@/utils/format';
import { ImportOutlined, PushpinFilled } from '@ant-design/icons';
import { ConnectType, useWallet } from '@terra-money/wallet-provider';
import { Menu, Space } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export interface WalletManagementDropdownProps {
  setDropdownVisibility?: (isVisible: boolean) => void;
}

const WalletManagementDropdown: FC<WalletManagementDropdownProps> = ({ setDropdownVisibility = () => {} }) => {
  const dispatch = useAppDispatch();
  const { isWalletConnected } = useConnectedWallet();
  const { availableConnectTypes, availableInstallTypes, install, connect, disconnect } = useWallet();

  enum DropdownItemsKeys {
    CONNECT_EXTENSION = 'connect_extension',
    INSTALL_EXTENSION = 'install_extension',
    CONNECT_MOBILE = 'connect_mobile',
    INSTALL_MOBILE = 'install_mobile',
    DISCONNECT_WALLET = 'disconnect_wallet',
  }

  const showConnectExtension = !isWalletConnected && availableConnectTypes.includes(ConnectType.CHROME_EXTENSION);
  const showInstallExtension = !isWalletConnected && !availableConnectTypes.includes(ConnectType.CHROME_EXTENSION);
  const canInstallExtension = availableInstallTypes.includes(ConnectType.CHROME_EXTENSION);

  const showConnectMobile = !isWalletConnected && availableConnectTypes.includes(ConnectType.WALLETCONNECT);
  const showInstallMobile = !isWalletConnected && !availableConnectTypes.includes(ConnectType.WALLETCONNECT);
  const canInstallMobile = availableInstallTypes.includes(ConnectType.WALLETCONNECT);

  const showTokensBalances = isWalletConnected;
  const showDisconnect = isWalletConnected;

  function handleDropdownItemClick({ key }: any): void {
    const clickHandlersMap: { [key in DropdownItemsKeys]?: () => void } = {
      [DropdownItemsKeys.CONNECT_EXTENSION]: () => connect(ConnectType.CHROME_EXTENSION),
      [DropdownItemsKeys.INSTALL_EXTENSION]: () => install(ConnectType.CHROME_EXTENSION),
      [DropdownItemsKeys.CONNECT_MOBILE]: () => connect(ConnectType.WALLETCONNECT),
      [DropdownItemsKeys.INSTALL_MOBILE]: () => install(ConnectType.WALLETCONNECT),
      [DropdownItemsKeys.DISCONNECT_WALLET]: disconnect,
    };

    clickHandlersMap[key as DropdownItemsKeys]?.();
    setDropdownVisibility(false);
  }

  const { supportedTokens, mainToken } = useTokens();
  const dropdownVisibleTokens = supportedTokens.filter((token) => token.symbol !== mainToken.symbol);

  function handleTokenPin(token: Token): void {
    dispatch(setMainTokenSymbol(token.symbol));
    setDropdownVisibility(false);
  }

  return (
    <WrapperStyled selectable={false} onClick={handleDropdownItemClick}>
      {showConnectExtension && (
        <Menu.Item key={DropdownItemsKeys.CONNECT_EXTENSION}>
          <OptionStyled>
            <Space>
              <IconContainerStyled>
                <TerraStationExtensionIcon className="icon" />
              </IconContainerStyled>
              <div>Terra Station (extension)</div>
            </Space>
          </OptionStyled>
        </Menu.Item>
      )}

      {showInstallExtension && (
        <Menu.Item
          key={DropdownItemsKeys.INSTALL_EXTENSION}
          disabled={!canInstallExtension}
          className={!canInstallExtension ? 'disabled-menu-item' : ''}
        >
          <OptionStyled>
            <Space>
              <IconContainerStyled>
                <TerraStationExtensionIcon className="icon" />
              </IconContainerStyled>
              <div>Install Terra Station (extension)</div>
            </Space>
          </OptionStyled>
        </Menu.Item>
      )}

      {showConnectMobile && (
        <Menu.Item key={DropdownItemsKeys.CONNECT_MOBILE}>
          <OptionStyled>
            <Space>
              <IconContainerStyled>
                <TerraStationMobileIcon className="icon" />
              </IconContainerStyled>
              <div>Terra Station (mobile)</div>
            </Space>
          </OptionStyled>
        </Menu.Item>
      )}

      {showInstallMobile && (
        <Menu.Item
          key={DropdownItemsKeys.INSTALL_MOBILE}
          disabled={!canInstallMobile}
          className={!canInstallMobile ? 'disabled-menu-item' : ''}
        >
          <OptionStyled>
            <Space>
              <IconContainerStyled>
                <TerraStationMobileIcon className="icon" />
              </IconContainerStyled>
              <div>Install Terra Station (mobile)</div>
            </Space>
          </OptionStyled>
        </Menu.Item>
      )}

      {showTokensBalances &&
        dropdownVisibleTokens.map((token) => (
          <Menu.Item key={`TOKEN_DISPLAY_${token.symbol}`} disabled className="token-balance-menu-item">
            <OptionStyled>
              <Space className="token-balance-menu-item__space">
                <IconContainerStyled>
                  <img src={token.logo} className="icon" alt="" />
                </IconContainerStyled>
                <div className="flex flex-align-center flex-justify-between">
                  <div>
                    {format.cutDecimals(token.balance, 3)}&nbsp;
                    {token.ticker}
                  </div>
                  <div>
                    <UiLink mode="empty" onClick={() => handleTokenPin(token)}>
                      <PushpinFilled style={{ fontSize: '14px' }} />
                    </UiLink>
                  </div>
                </div>
              </Space>
            </OptionStyled>
          </Menu.Item>
        ))}

      {showDisconnect && (
        <>
          <Menu.Divider />
          <Menu.Item key={DropdownItemsKeys.DISCONNECT_WALLET}>
            <OptionStyled className="text-color-danger">
              <Space>
                <IconContainerStyled>
                  <ImportOutlined className="icon" />
                </IconContainerStyled>
                <div>Disconnect</div>
              </Space>
            </OptionStyled>
          </Menu.Item>
        </>
      )}
    </WrapperStyled>
  );
};

const WrapperStyled = styled(Menu)`
  width: 100%;
  min-width: 200px;
  border-right: none;

  .disabled-menu-item:active {
    background: transparent;
  }

  .token-balance-menu-item {
    color: var(--white-color) !important;
    cursor: default;
    font-weight: 500;

    &__space {
      width: 100%;

      .ant-space-item:last-child {
        width: 100%;
      }
    }

    &:active {
      background: transparent;
    }
  }

  .ant-menu-item:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const OptionStyled = styled.div`
  user-select: none;
`;

const IconContainerStyled = styled.div`
  display: flex;
  align-items: center;

  .icon {
    width: 16px;
    font-size: 16px;
  }
`;

export default WalletManagementDropdown;
