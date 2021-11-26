import { UiTokensSelect } from '@/components/ui';
import { TokenSymbol } from '@/constants/tokens';
import { useTokens } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import { setDisplayGamesTokensSymbols, setIsOnlyMyGamesDisplayed } from '@/state/coinflip';
import { Space } from 'antd';
import { FC } from 'react';
import AdditionalFiltersSettings from './components/AdditionalFiltersSettings/AdditionalFiltersSettings';
import BetsSizesFilter from './components/BetsSizesFilter/BetsSizesFilter';
import MyGamesSwitch from './components/MyGamesSwitch/MyGamesSwitch';

const GamesFilters: FC = () => {
  const dispatch = useAppDispatch();
  const { supportedTokens } = useTokens();

  const { isOnlyMyGamesDisplayed, displayGamesTokensSymbols } = useAppSelector((state) => state.coinflip);

  return (
    <Space>
      <Space size={24}>
        <MyGamesSwitch
          value={isOnlyMyGamesDisplayed}
          amountGames={0}
          disabled={false}
          onChange={(isActive) => dispatch(setIsOnlyMyGamesDisplayed(isActive))}
        />

        <UiTokensSelect
          tokens={supportedTokens}
          selected={displayGamesTokensSymbols}
          allowEmpty={false}
          multiple
          onChange={(symbols) => dispatch(setDisplayGamesTokensSymbols(symbols as TokenSymbol[]))}
        />
      </Space>

      <BetsSizesFilter tokensSymbols={displayGamesTokensSymbols} />

      <AdditionalFiltersSettings />
    </Space>
  );
};

export default GamesFilters;
