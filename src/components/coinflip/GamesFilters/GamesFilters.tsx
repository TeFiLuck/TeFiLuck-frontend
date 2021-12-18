import { UiTokensSelect } from '@/components/ui';
import { TokenSymbol } from '@/constants/tokens';
import { useTokens } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import { setDisplayGamesTokensSymbols } from '@/state/coinflip';
import { BaseSize } from '@/typings/app';
import { Space } from 'antd';
import { FC } from 'react';
import AdditionalFiltersSettings from './components/AdditionalFiltersSettings/AdditionalFiltersSettings';
import BetsSizesFilter from './components/BetsSizesFilter/BetsSizesFilter';

export interface GamesFiltersProps {
  size?: BaseSize;
}

const GamesFilters: FC<GamesFiltersProps> = ({ size = 'medium' }) => {
  const dispatch = useAppDispatch();
  const { supportedTokens } = useTokens();

  const { displayGamesTokensSymbols } = useAppSelector((state) => state.coinflip);

  return (
    <Space>
      <UiTokensSelect
        tokens={supportedTokens}
        size={size}
        selected={displayGamesTokensSymbols}
        allowEmpty={false}
        multiple
        onChange={(symbols) => dispatch(setDisplayGamesTokensSymbols(symbols as TokenSymbol[]))}
      />

      <BetsSizesFilter size={size} tokensSymbols={displayGamesTokensSymbols} />

      <AdditionalFiltersSettings size={size} />
    </Space>
  );
};

export default GamesFilters;
