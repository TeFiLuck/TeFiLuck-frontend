import CreateGameModal from '@/components/coinflip/CreateGameModal/CreateGameModal';
import GameFlowAlert from '@/components/coinflip/GameFlowAlert/GameFlowAlert';
import GamesDisplay from '@/components/coinflip/GamesDisplay/GamesDisplay';
import GamesDisplayModeSelect from '@/components/coinflip/GamesDisplayModeSelect/GamesDisplayModeSelect';
import GamesFilters from '@/components/coinflip/GamesFilters/GamesFilters';
import { UiButton } from '@/components/ui';
import { useMediaQueries } from '@/hooks';
import { useGames } from '@/hooks/coinflip';
import BaseLayout from '@/layouts/BaseLayout/BaseLayout';
import { useAppDispatch, useAppSelector } from '@/state';
import { setIsCreateGameModalOpened } from '@/state/coinflip';
import { FilterFilled } from '@ant-design/icons';
import { Space } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useGamesDisplayControl } from './hooks';

const Page: FC = () => {
  useGamesDisplayControl();

  const dispatch = useAppDispatch();
  const { is800PxOrLess, is600PxOrLess, is440PxOrLess } = useMediaQueries();
  const { isCreateGameModalOpened } = useAppSelector((state) => state.coinflip);
  const { isGamesFiltersEnabled, isGamesDisplayModeSelectionEnabled } = useGames();

  const [createGameModalKey, setCreateGameModalKey] = useState(uuidv4());

  const isMobileFiltersVisible = is800PxOrLess;
  const filtersSize = isMobileFiltersVisible ? 'small' : 'medium';
  const gamesDisplayHeadingClass = is440PxOrLess ? 'heading-4' : 'heading-3';

  const GamesFiltersDisplay = <GamesFilters disabled={!isGamesFiltersEnabled} size={filtersSize} />;

  return (
    <BaseLayout topBanner={<GameFlowAlert style={{ padding: '8px var(--global-standard-horizontal-offset)' }} />}>
      <ContentStyled>
        <GameCreationSectionStyled>
          <div>
            <h1 className="heading-2 noselect">Coinflip</h1>
          </div>
          <div>
            <UiButton
              size={is600PxOrLess ? 'middle' : 'large'}
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
            <span className={`${gamesDisplayHeadingClass} text-color-white noselect`}>
              Games&nbsp;&nbsp;
              <span className="text-color-primary">777</span>
            </span>
          </div>
          <div>
            <Space>
              <GamesDisplayModeSelect disabled={!isGamesDisplayModeSelectionEnabled} size={filtersSize} />

              {!isMobileFiltersVisible && GamesFiltersDisplay}
            </Space>
          </div>
        </GamesFiltersSectionStyled>

        {isMobileFiltersVisible && (
          <MobileGamesFiltersSectionStyled>
            {!is440PxOrLess && (
              <div>
                <span className="heading-4 noselect">
                  Filters&nbsp;
                  <FilterFilled />
                </span>
              </div>
            )}
            {GamesFiltersDisplay}
          </MobileGamesFiltersSectionStyled>
        )}

        <GamesDisplay />
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
  margin-bottom: 48px;

  @media screen and (max-width: 440px) {
    margin-bottom: 36px;
  }
`;

const GamesFiltersSectionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  @media screen and (max-width: 800px) {
    margin-bottom: 16px;
  }
`;

const MobileGamesFiltersSectionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  @media screen and (max-width: 440px) {
    justify-content: center;
  }
`;

export default Page;
