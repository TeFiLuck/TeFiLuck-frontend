import { BoxStyled } from '@/components/styleds';
import { TokenSymbol } from '@/constants/tokens';
import { useAppDispatch, useAppSelector } from '@/state';
import { setBetsSizesRanges } from '@/state/coinflip';
import { BaseSize } from '@/typings/app';
import { createFreshBetSizesRangeBySymbol } from '@/utils/coinflip';
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import * as CSS from 'csstype';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BetsSizesFilterDropdownBody from './components/BetsSizesFilterDropdownBody/BetsSizesFilterDropdownBody';

export interface BetsSizesFilterProps {
  tokensSymbols: TokenSymbol[];
  size?: BaseSize;
  fixed?: boolean;
  disabled?: boolean;
  minWidth?: CSS.Property.MinWidth;
  width?: CSS.Property.Width;
}

const BetsSizesFilter: FC<BetsSizesFilterProps> = ({
  tokensSymbols,
  size = 'medium',
  fixed = false,
  disabled = false,
  minWidth = '120px',
  width = 'auto',
}) => {
  const dispatch = useAppDispatch();
  const { betsSizesRanges } = useAppSelector((state) => state.coinflip);

  useEffect(() => {
    const rangesSymbols = betsSizesRanges.map((range) => range.tokenSymbol);
    const activeRanges = betsSizesRanges.filter((range) => tokensSymbols.includes(range.tokenSymbol));
    const newSymbols = tokensSymbols.filter((symbol) => !rangesSymbols.includes(symbol));

    const finalRanges = [...activeRanges, ...newSymbols.map(createFreshBetSizesRangeBySymbol)];

    dispatch(setBetsSizesRanges(finalRanges));
  }, [tokensSymbols]);

  /* Display details */
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const dropdownTrigger = useRef<HTMLDivElement>(null);

  function handleKeyPress(e: any): void {
    if (e.key === 'Enter' && !disabled) {
      setDropdownVisibility(!isDropdownVisible);
      handleClick();
    }
  }

  function handleClick(): void {
    dropdownTrigger.current?.blur();
  }

  const overlayStyle: Record<string, string> = {};
  if (fixed) overlayStyle.position = 'fixed';

  return (
    <Dropdown
      overlay={<BetsSizesFilterDropdownBody setDropdownVisibility={setDropdownVisibility} />}
      destroyPopupOnHide
      placement="bottomCenter"
      overlayStyle={overlayStyle}
      trigger={['click']}
      disabled={disabled || !tokensSymbols.length}
      arrow
      visible={isDropdownVisible}
      onVisibleChange={(isVisible) => setDropdownVisibility(isVisible)}
    >
      <ContentStyled
        ref={dropdownTrigger}
        size={size}
        active={isDropdownVisible}
        disabled={disabled}
        width={width}
        minWidth={minWidth}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
      >
        <div className="flex flex-align-center flex-justify-between full-width">
          <span>Bets sizes</span>
          <CaretDownOutlined className="caret-icon" />
        </div>
      </ContentStyled>
    </Dropdown>
  );
};

const ContentStyled = styled(BoxStyled)<{
  active: boolean;
  disabled: boolean;
  minWidth: CSS.Property.MinWidth;
  width: CSS.Property.Width;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: var(--white-color);
  transition: 0.2s all;
  outline: none;

  ${({ minWidth, width }) => `
    width: ${width};
    min-width: ${minWidth};
  `}

  .caret-icon {
    transition: 0.2s all;
  }

  ${({ active }) =>
    active
      ? `
    border-color: var(--global-primary-color);

    .caret-icon {
      color: var(--global-primary-color);
    }
  `
      : ''}

  ${({ disabled }) =>
    disabled
      ? `
    cursor: not-allowed;
    opacity: 0.5;
  `
      : `
    cursor: pointer;
    &:hover, &:focus {
      border-color: var(--global-primary-color);
    }

    &:hover {
      .caret-icon {
        color: var(--global-primary-color);
      }
    }
  `}
`;

export default BetsSizesFilter;
