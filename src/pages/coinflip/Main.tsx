import CreateGame from '@/components/coinflip/CreateGame/CreateGame';
import BaseLayout from '@/layouts/BaseLayout/BaseLayout';
import { FC } from 'react';
import styled from 'styled-components';

const Page: FC = () => {
  return (
    <BaseLayout>
      <ContentStyled>
        <GameCreationSectionStyled>
          <div>
            <h1 className="heading-2 noselect">Coinflip</h1>
          </div>
          <div>
            <CreateGame />
          </div>
        </GameCreationSectionStyled>
      </ContentStyled>
    </BaseLayout>
  );
};

const ContentStyled = styled.div`
  padding: 0 var(--global-standard-horizontal-offset);
`;

const GameCreationSectionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Page;
