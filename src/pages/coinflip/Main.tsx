import CreateGame from '@/components/coinflip/CreateGame/CreateGame';
import GamesFilters from '@/components/coinflip/GamesFilters/GamesFilters';
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

        <GamesFiltersSectionStyled>
          <div>
            <span className="heading-3 text-color-white noselect">
              Open Games&nbsp;&nbsp;
              <span className="text-color-primary">777</span>
            </span>
          </div>
          <div>
            <GamesFilters />
          </div>
        </GamesFiltersSectionStyled>
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
  margin-bottom: 64px;
`;

const GamesFiltersSectionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Page;
