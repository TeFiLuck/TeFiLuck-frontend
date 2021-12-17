import CurrentBlockNumberDisplay from '@/components/CurrentBlockNumberDisplay/CurrentBlockNumberDisplay';
import { UiLink, UiLogo } from '@/components/ui';
import WalletManagement from '@/components/WalletManagement/WalletManagement';
import { useConnectedWallet, useMediaQueries } from '@/hooks';
import { Space } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';
import MainMenu from './components/MainMenu/MainMenu';
import RefreshWalletButton from './components/RefreshWalletButton/RefreshWalletButton';
import SubMenu from './components/SubMenu/SubMenu';

export interface AppHeaderProps {
  fixed?: boolean;
}

const AppHeader: FC<AppHeaderProps> = ({ fixed = false }) => {
  const { is1200PxOrLess, is1024PxOrLess } = useMediaQueries();
  const { isWalletConnected } = useConnectedWallet();

  const walletManagementSize = (() => {
    if (is1024PxOrLess) return 'medium';
    if (is1200PxOrLess) return 'small';

    return 'medium';
  })();

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
          <SubMenu />
          <CurrentBlockNumberDisplay />
        </SubMenuContainerStyled>
        <MainMenuContainerStyled>
          {is1024PxOrLess ? (
            <UiLink to="/">
              <UiLogo size="small" />
            </UiLink>
          ) : (
            <MainMenu />
          )}

          <Space>
            <WalletManagement dropdownFixed={fixed} size={walletManagementSize} />
            {isWalletConnected && <RefreshWalletButton />}
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
`;

const MainMenuContainerStyled = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default AppHeader;
