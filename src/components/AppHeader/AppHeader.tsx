import CurrentBlockNumberDisplay from '@/components/CurrentBlockNumberDisplay/CurrentBlockNumberDisplay';
import { UiLink, UiLogo } from '@/components/ui';
import WalletManagement from '@/components/WalletManagement/WalletManagement';
import { useConnectedWallet, useMediaQueries } from '@/hooks';
import { MenuOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import MainMenu from './components/MainMenu/MainMenu';
import RefreshWalletButton from './components/RefreshWalletButton/RefreshWalletButton';
import SideMenu from './components/SideMenu/SideMenu';
import SubMenu from './components/SubMenu/SubMenu';

export interface AppHeaderProps {
  fixed?: boolean;
}

const AppHeader: FC<AppHeaderProps> = ({ fixed = false }) => {
  const { is1200PxOrLess, is1024PxOrLess, is750PxOrLess, is600PxOrLess, is440PxOrLess } = useMediaQueries();
  const { isWalletConnected } = useConnectedWallet();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const walletManagementSize = (() => {
    if (is600PxOrLess) return 'xsmall';
    if (is750PxOrLess) return 'small';
    if (is1024PxOrLess) return 'medium';
    if (is1200PxOrLess) return 'small';

    return 'medium';
  })();

  const subMenuSize = is750PxOrLess ? 'small' : 'medium';

  useEffect(() => {
    if (!is1024PxOrLess) {
      setIsSideMenuVisible(false);
    }
  }, [is1024PxOrLess]);

  return (
    <WrapperStyled fixed={fixed}>
      {!is1024PxOrLess && (
        <LogoContainerStyled>
          <UiLink to="/">
            <UiLogo />
          </UiLink>
        </LogoContainerStyled>
      )}
      <MenusContainerStyled>
        <SubMenuContainerStyled>
          <SubMenu size={subMenuSize} />
          <CurrentBlockNumberDisplay />
        </SubMenuContainerStyled>
        <MainMenuContainerStyled>
          {is1024PxOrLess ? (
            <UiLink to="/">
              <UiLogo size={is440PxOrLess ? 'xsmall' : 'small'} />
            </UiLink>
          ) : (
            <MainMenu />
          )}

          <Space>
            <WalletManagement dropdownFixed={fixed} size={walletManagementSize} />
            {isWalletConnected && <RefreshWalletButton />}

            {is1024PxOrLess && (
              <div>
                <UiLink mode="empty" fontSize="24px" color="#fff" onClick={() => setIsSideMenuVisible(true)}>
                  <MenuOutlined />
                </UiLink>

                <SideMenu visible={isSideMenuVisible} onChange={setIsSideMenuVisible} />
              </div>
            )}
          </Space>
        </MainMenuContainerStyled>
      </MenusContainerStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.header<{
  fixed: boolean;
}>`
  width: 100%;
  height: var(--global-app-header-height);
  max-height: var(--global-app-header-height);
  overflow: hidden;
  background: var(--global-base-component-bg-color);
  display: grid;
  grid-template-columns: 280px 1fr;
  z-index: 1000;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  ${({ fixed }) =>
    fixed
      ? `
    position: fixed;
    top: 0;
    left: 0;
  `
      : ''}
`;

const LogoContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenusContainerStyled = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
`;

const SubMenuContainerStyled = styled.div`
  background: var(--dark-color-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 24px;

  @media screen and (max-width: 750px) {
    padding: 0 var(--global-standard-horizontal-offset);
  }
`;

const MainMenuContainerStyled = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 750px) {
    padding: 0 var(--global-standard-horizontal-offset);
  }
`;

export default AppHeader;
