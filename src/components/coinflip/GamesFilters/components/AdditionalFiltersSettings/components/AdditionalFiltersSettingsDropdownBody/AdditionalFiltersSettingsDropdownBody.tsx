import { UiBlocksTimeRange, UiButton } from '@/components/ui';
import {
  GamesSortingMethod,
  GAMES_PAGINATION_SIZES,
  GAMES_SORTING_METHODS,
  MAX_BLOCKS_BEFORE_LIQUIDABLE,
  MIN_BLOCKS_BEFORE_LIQUIDABLE,
} from '@/constants/coinflip';
import { useAppDispatch, useAppSelector } from '@/state';
import { setPaginationSize, setResolveTimeLimitRange, setSortingMethod } from '@/state/coinflip';
import { Menu } from 'antd';
import isEqual from 'lodash/isEqual';
import { FC, useState } from 'react';
import styled from 'styled-components';
import './styles.css';

export interface AdditionalFiltersSettingsDropdownBodyProps {
  setDropdownVisibility?: (isVisible: boolean) => void;
}

const AdditionalFiltersSettingsDropdownBody: FC<AdditionalFiltersSettingsDropdownBodyProps> = ({
  setDropdownVisibility = () => {},
}) => {
  const dispatch = useAppDispatch();
  const { sortingMethod, paginationSize, resolveTimeLimitRange } = useAppSelector((state) => state.coinflip);

  const [internalSortingMethod, setInternalSortingMethod] = useState(sortingMethod);
  const [internalPaginationSize, setInternalPaginationSize] = useState(paginationSize);
  const [internalResolveTimeLimitRange, setInternalResolveTimeLimitRange] = useState<[number, number]>([
    ...resolveTimeLimitRange,
  ]);

  const currentSortingMethod = GAMES_SORTING_METHODS[internalSortingMethod];

  function isSortingMethodActive(key: GamesSortingMethod | string): boolean {
    return key === internalSortingMethod;
  }

  function isPaginationSizeActive(size: number): boolean {
    return size === internalPaginationSize;
  }

  function canApplyChanges(): boolean {
    return !(
      sortingMethod === internalSortingMethod &&
      paginationSize === internalPaginationSize &&
      isEqual(resolveTimeLimitRange, internalResolveTimeLimitRange)
    );
  }

  function onItemClick({ key }: { key: string }): void {
    if (Object.keys(GAMES_SORTING_METHODS).includes(key)) {
      if (!isSortingMethodActive(key)) {
        setInternalSortingMethod(key as GamesSortingMethod);
      }
    }

    if (GAMES_PAGINATION_SIZES.includes(Number(key))) {
      if (!isPaginationSizeActive(Number(key))) {
        setInternalPaginationSize(Number(key));
      }
    }
  }

  function applyChanges(): void {
    dispatch(setSortingMethod(internalSortingMethod));
    dispatch(setPaginationSize(internalPaginationSize));
    dispatch(setResolveTimeLimitRange(internalResolveTimeLimitRange));
    setDropdownVisibility(false);
  }

  return (
    <WrapperStyled selectable={false} subMenuCloseDelay={0.2} onClick={onItemClick}>
      <Menu.Item key="resolve-time-limit" className="resolve-time-limit-menu-item" disabled>
        <ResolveTimeLimitFilterBodyStyled>
          Resolve time-limit (hours):
          <div>
            <UiBlocksTimeRange
              value={internalResolveTimeLimitRange}
              min={MIN_BLOCKS_BEFORE_LIQUIDABLE}
              max={MAX_BLOCKS_BEFORE_LIQUIDABLE}
              step={MIN_BLOCKS_BEFORE_LIQUIDABLE}
              onChange={setInternalResolveTimeLimitRange}
            />
          </div>
        </ResolveTimeLimitFilterBodyStyled>
      </Menu.Item>

      <Menu.SubMenu
        title={`Sort (${currentSortingMethod.label})`}
        key="sort"
        popupClassName="coinflip-additional-filters-settings-dropdown-submenu"
      >
        {Object.entries(GAMES_SORTING_METHODS).map(([key, method]) => (
          <Menu.Item key={key}>
            <span className={isSortingMethodActive(key) ? 'text-color-primary' : ''}>{method.label}</span>
          </Menu.Item>
        ))}
      </Menu.SubMenu>

      <Menu.SubMenu
        title={`Show amount (${internalPaginationSize})`}
        key="pagination"
        popupClassName="coinflip-additional-filters-settings-dropdown-submenu"
      >
        {GAMES_PAGINATION_SIZES.map((size) => (
          <Menu.Item key={size}>
            <span className={isPaginationSizeActive(size) ? 'text-color-primary' : ''}>{size}</span>
          </Menu.Item>
        ))}
      </Menu.SubMenu>

      <Menu.Divider />

      <Menu.Item key="apply_changes" className="apply-changes-menu-item" disabled>
        <UiButton
          type="primary"
          theme="alternative"
          size="small"
          uppercase
          disabled={!canApplyChanges()}
          style={{ width: '100%' }}
          onClick={applyChanges}
        >
          Apply
        </UiButton>
      </Menu.Item>
    </WrapperStyled>
  );
};

const WrapperStyled = styled(Menu)`
  border-right: none;
  width: 200px;
  border-radius: 4px;

  .ant-menu-item,
  .ant-menu-submenu-title {
    margin-bottom: 0px !important;
    margin-top: 0px;
    user-select: none;
  }

  .resolve-time-limit-menu-item {
    background: transparent;
    cursor: default;
    height: auto;
  }

  .apply-changes-menu-item {
    background: transparent;
    cursor: default;
  }
`;

const ResolveTimeLimitFilterBodyStyled = styled.div`
  line-height: 1;
  padding-top: 14px;
  color: var(--global-text-color);

  .ant-slider-with-marks {
    margin-bottom: 20px;
  }

  .ant-slider-mark-text {
    font-size: 10px;
  }
`;

export default AdditionalFiltersSettingsDropdownBody;
