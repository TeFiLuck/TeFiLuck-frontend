import { ReactComponent as TerraStationExtensionIcon } from '@/assets/images/terra-station-extension.svg';
import { ReactComponent as TerraStationMobileIcon } from '@/assets/images/terra-station-mobile.svg';
import { ImportOutlined } from '@ant-design/icons';
import { ConnectType, useConnectedWallet, useWallet } from '@terra-money/wallet-provider';
import { Menu, Space } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export interface WalletManagementDropdownProps {
  setDropdownVisibility?: (isVisible: boolean) => void;
}

const WalletManagementDropdown: FC<WalletManagementDropdownProps> = ({
  setDropdownVisibility = () => {},
}) => {
  const connectedWallet = useConnectedWallet();
  const { availableConnectTypes, availableInstallTypes, install, connect, disconnect } =
    useWallet();

  enum DropdownItemsKeys {
    CONNECT_EXTENSION = 'connect_extension',
    INSTALL_EXTENSION = 'install_extension',
    CONNECT_MOBILE = 'connect_mobile',
    INSTALL_MOBILE = 'install_mobile',
    DISCONNECT_WALLET = 'disconnect_wallet',
  }

  const showConnectExtension =
    !connectedWallet && availableConnectTypes.includes(ConnectType.CHROME_EXTENSION);
  const showInstallExtension =
    !connectedWallet && !availableConnectTypes.includes(ConnectType.CHROME_EXTENSION);
  const canInstallExtension = availableInstallTypes.includes(ConnectType.CHROME_EXTENSION);

  const showConnectMobile =
    !connectedWallet && availableConnectTypes.includes(ConnectType.WALLETCONNECT);
  const showInstallMobile =
    !connectedWallet && !availableConnectTypes.includes(ConnectType.WALLETCONNECT);
  const canInstallMobile = availableInstallTypes.includes(ConnectType.WALLETCONNECT);

  const showDisconnect = !!connectedWallet;

  function handleDropdownItemClick({ key }: any): void {
    const clickHandlersMap: Record<DropdownItemsKeys, () => void> = {
      [DropdownItemsKeys.CONNECT_EXTENSION]: () => connect(ConnectType.CHROME_EXTENSION),
      [DropdownItemsKeys.INSTALL_EXTENSION]: () => install(ConnectType.CHROME_EXTENSION),
      [DropdownItemsKeys.CONNECT_MOBILE]: () => connect(ConnectType.WALLETCONNECT),
      [DropdownItemsKeys.INSTALL_MOBILE]: () => install(ConnectType.WALLETCONNECT),
      [DropdownItemsKeys.DISCONNECT_WALLET]: disconnect,
    };

    clickHandlersMap[key as DropdownItemsKeys]();
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
        <Menu.Item key={DropdownItemsKeys.INSTALL_EXTENSION} disabled={!canInstallExtension}>
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
        <Menu.Item key={DropdownItemsKeys.INSTALL_MOBILE} disabled={!canInstallMobile}>
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

      {showDisconnect && (
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
      )}
    </WrapperStyled>
  );
};

const WrapperStyled = styled(Menu)`
  width: 100%;
  min-width: 200px;

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
