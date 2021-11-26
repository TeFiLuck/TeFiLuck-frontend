import { UiButton, UiNumberInput } from '@/components/ui';
import { MAX_BET_SIZE } from '@/constants/coinflip';
import { TokenSymbol } from '@/constants/tokens';
import { useTokens } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import { setBetsSizesRanges } from '@/state/coinflip';
import { BetSizesRange } from '@/typings/coinflip';
import { getMinRequiredAmountToCreateGame } from '@/utils/coinflip';
import { Space } from 'antd';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

export interface BetsSizesFilterDropdownBodyProps {
  setDropdownVisibility?: (isVisible: boolean) => void;
}

const BetsSizesFilterDropdownBody: FC<BetsSizesFilterDropdownBodyProps> = ({ setDropdownVisibility = () => {} }) => {
  const dispatch = useAppDispatch();
  const { betsSizesRanges } = useAppSelector((state) => state.coinflip);
  const { supportedTokens } = useTokens();

  const [hasChangesBeenMade, setHasChangesBeenMade] = useState(false);
  const [betsSizesRangesInternal, setBetsSizesRangesInternal] = useState(
    cloneBetsSizesRanges<string>(betsSizesRanges, 'string'),
  );

  useEffect(() => {
    setBetsSizesRangesInternal(cloneBetsSizesRanges<string>(betsSizesRanges, 'string'));
  }, [betsSizesRanges]);

  function changeRangeValue(value: string, range: BetSizesRange<string>, field: 'min' | 'max'): void {
    const betsSizesRangesClone = [...betsSizesRangesInternal];

    const updatedRange = {
      ...range,
      [field]: value,
    };

    if (field === 'min' && Number(value) > Number(range.max)) {
      updatedRange.max = value;
    }

    if (field === 'max' && Number(value) < Number(range.min)) {
      updatedRange.min = value;
    }

    const currentRangeIdx = betsSizesRangesInternal.findIndex(
      (rangeItem) => rangeItem.tokenSymbol === range.tokenSymbol,
    );
    betsSizesRangesClone.splice(currentRangeIdx, 1, updatedRange);
    setBetsSizesRangesInternal(betsSizesRangesClone);
    setHasChangesBeenMade(true);
  }

  function applyChanges(): void {
    dispatch(setBetsSizesRanges(cloneBetsSizesRanges<number>(betsSizesRangesInternal, 'number')));
    setHasChangesBeenMade(false);
    setDropdownVisibility(false);
  }

  function getTokenLogoBySymbol(symbol: TokenSymbol): string {
    const token = supportedTokens.find((tokenItem) => tokenItem.symbol === symbol);
    return token?.logo || '';
  }

  function cloneBetsSizesRanges<T extends string | number>(
    ranges: BetSizesRange<any>[],
    valuesRepresentation: 'string' | 'number',
  ): BetSizesRange<T>[] {
    const convert = valuesRepresentation === 'string' ? String : Number;

    return ranges.map((range) => ({
      ...range,
      min: convert(range.min),
      max: convert(range.max),
    })) as BetSizesRange<T>[];
  }

  return (
    <WrapperStyled>
      {betsSizesRangesInternal.length ? (
        <Space direction="vertical" size={12}>
          {betsSizesRangesInternal.map((range) => (
            <Space key={`token_limit_${range.tokenSymbol}`}>
              <img src={getTokenLogoBySymbol(range.tokenSymbol)} className="token-logo" alt="" />

              <UiNumberInput
                value={String(range.min)}
                min={getMinRequiredAmountToCreateGame(range.tokenSymbol)}
                max={MAX_BET_SIZE}
                decimals={3}
                size="small"
                onChange={(value) => changeRangeValue(value, range, 'min')}
              />

              <span className="noselect">-</span>

              <UiNumberInput
                value={String(range.max)}
                min={getMinRequiredAmountToCreateGame(range.tokenSymbol)}
                max={MAX_BET_SIZE}
                decimals={3}
                size="small"
                onChange={(value) => changeRangeValue(value, range, 'max')}
              />
            </Space>
          ))}

          <UiButton
            type="primary"
            theme="alternative"
            size="small"
            disabled={!hasChangesBeenMade}
            uppercase
            style={{ width: '100%' }}
            onClick={applyChanges}
          >
            Apply
          </UiButton>
        </Space>
      ) : (
        <div className="empty-content">No tokens selected</div>
      )}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  background: var(--dark-color-5);
  box-sizing: border-box;
  border-radius: 4px;
  padding: 12px 8px;
  width: 200px;

  .empty-content {
    text-align: center;
    font-weight: 500;
  }

  .token-logo {
    height: auto;
    width: 18px;
    user-select: none;
  }
`;

export default BetsSizesFilterDropdownBody;
