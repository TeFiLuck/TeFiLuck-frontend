import { GamesSortingMethod, GAMES_PAGINATION_SIZES, GAMES_SORTING_METHODS } from '@/constants/coinflip';
import { useAppDispatch, useAppSelector } from '@/state';
import { setPaginationSize, setSortingMethod } from '@/state/coinflip';
import { Menu } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';
import './styles.css';

const AdditionalFiltersSettingsDropdownBody: FC = () => {
  const dispatch = useAppDispatch();
  const { sortingMethod, paginationSize } = useAppSelector((state) => state.coinflip);

  const currentSortingMethod = GAMES_SORTING_METHODS[sortingMethod];

  function isSortingMethodActive(key: GamesSortingMethod | string): boolean {
    return key === sortingMethod;
  }

  function isPaginationSizeActive(size: number): boolean {
    return size === paginationSize;
  }

  function onItemClick({ key }: { key: string }): void {
    if (Object.keys(GAMES_SORTING_METHODS).includes(key)) {
      if (!isSortingMethodActive(key)) {
        dispatch(setSortingMethod(key as GamesSortingMethod));
      }
    }

    if (GAMES_PAGINATION_SIZES.includes(Number(key))) {
      if (!isPaginationSizeActive(Number(key))) {
        dispatch(setPaginationSize(Number(key)));
      }
    }
  }

  return (
    <WrapperStyled selectable={false} subMenuCloseDelay={0.2} onClick={onItemClick}>
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
        title={`Show amount (${paginationSize})`}
        key="pagination"
        popupClassName="coinflip-additional-filters-settings-dropdown-submenu"
      >
        {GAMES_PAGINATION_SIZES.map((size) => (
          <Menu.Item key={size}>
            <span className={isPaginationSizeActive(size) ? 'text-color-primary' : ''}>{size}</span>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
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
`;

export default AdditionalFiltersSettingsDropdownBody;
