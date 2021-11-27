import CreateGameModal from '@/components/coinflip/CreateGameModal/CreateGameModal';
import GamesFilters from '@/components/coinflip/GamesFilters/GamesFilters';
import { UiButton } from '@/components/ui';
import BaseLayout from '@/layouts/BaseLayout/BaseLayout';
import { useAppDispatch, useAppSelector } from '@/state';
import { setIsCreateGameModalOpened } from '@/state/coinflip';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Page: FC = () => {
  const dispatch = useAppDispatch();
  const { isCreateGameModalOpened } = useAppSelector((state) => state.coinflip);
  const [createGameModalKey, setCreateGameModalKey] = useState(uuidv4());

  return (
    <BaseLayout>
      <ContentStyled>
        <GameCreationSectionStyled>
          <div>
            <h1 className="heading-2 noselect">Coinflip</h1>
          </div>
          <div>
            <UiButton
              size="large"
              type="primary"
              theme="alternative"
              shape="round"
              onClick={() => dispatch(setIsCreateGameModalOpened(true))}
            >
              Create game
            </UiButton>
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

      <CreateGameModal
        key={createGameModalKey}
        visible={isCreateGameModalOpened}
        onChange={(isVisible) => dispatch(setIsCreateGameModalOpened(isVisible))}
        onClosed={() => setCreateGameModalKey(uuidv4())}
      />
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
