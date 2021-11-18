import AppHeader from '@/components/AppHeader/AppHeader';
import { FC } from 'react';
import styled from 'styled-components';

const BaseLayout: FC = ({ children }) => {
  return (
    <WrapperStyled>
      <AppHeader fixed />

      <ContentStyled>{children}</ContentStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  padding-top: var(--global-app-header-height);
`;

const ContentStyled = styled.div`
  height: calc(100vh - var(--global-app-header-height));
`;

export default BaseLayout;
