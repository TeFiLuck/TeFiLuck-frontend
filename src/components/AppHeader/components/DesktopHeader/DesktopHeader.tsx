import { UiLink, UiLogo } from '@/components/ui';
import WalletManagement from '@/components/WalletManagement/WalletManagement';
import { FC } from 'react';
import styled from 'styled-components';
import { AppHeaderProps } from '../../types';
import MainMenu from './components/MainMenu/MainMenu';
import SubMenu from './components/SubMenu/SubMenu';

const DesktopHeader: FC<AppHeaderProps> = ({ fixed = false }) => {
  return (
    <WrapperStyled fixed={fixed}>
      <LogoContainerStyled>
        <UiLink to="/">
          <UiLogo />
        </UiLink>
      </LogoContainerStyled>
      <MenusContainerStyled>
        <SubMenuContainerStyled>
          <SubMenu />
        </SubMenuContainerStyled>
        <MainMenuContainerStyled>
          <MainMenu />
          <WalletManagement dropdownFixed={fixed} />
        </MainMenuContainerStyled>
      </MenusContainerStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{
  fixed: boolean;
}>`
  width: 100%;
  height: var(--global-app-header-height);
  max-height: var(--global-app-header-height);
  overflow: hidden;
  background: var(--global-base-component-bg-color);
  display: grid;
  grid-template-columns: 280px 1fr;

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
  box-sizing: border-box;
  padding: 0 24px;
`;

const MainMenuContainerStyled = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default DesktopHeader;
