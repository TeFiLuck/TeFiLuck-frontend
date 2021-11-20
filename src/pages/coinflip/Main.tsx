import BaseLayout from '@/layouts/BaseLayout/BaseLayout';
import { FC } from 'react';
import styled from 'styled-components';

const Page: FC = () => {
  return (
    <BaseLayout>
      <ContentStyled>
        <div>Coin flip</div>
      </ContentStyled>
    </BaseLayout>
  );
};

const ContentStyled = styled.div`
  padding: 0 var(--global-standard-horizontal-offset);
`;

export default Page;
