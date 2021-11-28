import AppHeader from '@/components/AppHeader/AppHeader';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export interface BaseLayoutProps {
  topBanner?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children, topBanner }) => {
  return (
    <WrapperStyled>
      <AppHeader fixed />
      <ContentStyled>
        <div>
          {topBanner || ''}
          <MainStyled>{children}</MainStyled>
        </div>
        <footer>Footer</footer>
      </ContentStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  padding-top: var(--global-app-header-height);
`;

const ContentStyled = styled.div`
  min-height: calc(100vh - var(--global-app-header-height));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainStyled = styled.main`
  padding: var(--global-standard-vertical-offset) 0;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`;

export default BaseLayout;
