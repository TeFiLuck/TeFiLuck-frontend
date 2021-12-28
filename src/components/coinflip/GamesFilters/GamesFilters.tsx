import { UiTokensSelect } from '@/components/ui';
import { TokenSymbol } from '@/constants/tokens';
import { useTokens } from '@/hooks';
import { useGames } from '@/hooks/coinflip';
import { useAppDispatch, useAppSelector } from '@/state';
import { setDisplayGamesTokensSymbols } from '@/state/coinflip';
import { BaseSize } from '@/typings/app';
import { Space } from 'antd';
import { FC } from 'react';
import AdditionalFiltersSettings from './components/AdditionalFiltersSettings/AdditionalFiltersSettings';
import BetsSizesFilter from './components/BetsSizesFilter/BetsSizesFilter';

export interface GamesFiltersProps {
  size?: BaseSize;
  disabled?: boolean;
}

const GamesFilters: FC<GamesFiltersProps> = ({ size = 'medium', disabled = false }) => {
  const dispatch = useAppDispatch();
  const { supportedTokens } = useTokens();
  const { isCurrenciesFilterEnabled, isBetSizesFilterEnabled } = useGames();

  const { displayGamesTokensSymbols } = useAppSelector((state) => state.coinflip);

  return (
    <Space>
      <UiTokensSelect
        tokens={supportedTokens}
        size={size}
        selected={displayGamesTokensSymbols}
        disabled={disabled || !isCurrenciesFilterEnabled}
        allowEmpty={false}
        multiple
        onChange={(symbols) => dispatch(setDisplayGamesTokensSymbols(symbols as TokenSymbol[]))}
      />

      <BetsSizesFilter
        disabled={disabled || !isBetSizesFilterEnabled}
        size={size}
        tokensSymbols={displayGamesTokensSymbols}
      />

      <AdditionalFiltersSettings disabled={disabled} size={size} />
    </Space>
  );
};

export default GamesFilters;
