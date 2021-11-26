import { BoxStyled } from '@/components/styleds';
import { TokenSymbol } from '@/constants/tokens';
import { BaseSize } from '@/typings/app';
import { Token } from '@/typings/finance-management';
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import * as CSS from 'csstype';
import isEqual from 'lodash/isEqual';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { UiTokensDropdownBody } from './components/UiTokensDropdownBody/UiTokensDropdownBody';

export interface UiTokensSelectProps {
  tokens: Token[];
  selected?: TokenSymbol | null | TokenSymbol[];
  size?: BaseSize;
  fixed?: boolean;
  disabled?: boolean;
  allowEmpty?: boolean;
  multiple?: boolean;
  placeholder?: string;
  minWidth?: CSS.Property.MinWidth;
  width?: CSS.Property.Width;
  onChange?: (symbol: TokenSymbol | null | TokenSymbol[]) => void;
}

export const UiTokensSelect: FC<UiTokensSelectProps> = ({
  tokens,
  selected = null,
  size = 'medium',
  fixed = false,
  disabled = false,
  allowEmpty = true,
  multiple = false,
  placeholder = 'Select',
  minWidth = '120px',
  width = 'auto',
  onChange = () => {},
}) => {
  /* Selected token symbol(-s) handling */
  const [selectedSymbols, setSelectedSymbols] = useState<TokenSymbol[]>(getSelectedSymbolsBySelectedProp());

  const selectedTokens = tokens.filter((token) => selectedSymbols.includes(token.symbol));

  // Two-way binding
  useEffect(() => {
    setSelectedSymbols(getSelectedSymbolsBySelectedProp());
  }, [selected]);

  useEffect(() => {
    if (multiple) {
      if (!isEqual(selected, selectedSymbols)) {
        onChange(selectedSymbols);
      }
    } else {
      const selectedTokenSymbol = selectedSymbols[0] || null;
      if (selected !== selectedTokenSymbol) {
        onChange(selectedTokenSymbol);
      }
    }
  }, [selectedSymbols]);

  function getSelectedSymbolsBySelectedProp(): TokenSymbol[] {
    if (!selected || !selected?.length) {
      if (!allowEmpty && tokens[0]) return [tokens[0].symbol];
      return [];
    }
    if (Array.isArray(selected)) return [...selected];
    return [selected];
  }

  function handleTokenSymbolChange(symbols: TokenSymbol[]): void {
    setSelectedSymbols([...symbols]);
  }

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
      overlay={
        <UiTokensDropdownBody
          tokens={tokens}
          selected={selectedSymbols}
          multiple={multiple}
          allowEmpty={allowEmpty}
          setDropdownVisibility={setDropdownVisibility}
          onChange={handleTokenSymbolChange}
        />
      }
      placement="bottomCenter"
      overlayStyle={overlayStyle}
      trigger={['click']}
      disabled={disabled}
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
          {selectedTokens.length ? (
            <Space>
              {selectedTokens.map((token) => (
                <Fragment key={`token_${token.symbol}`}>
                  <img src={token.logo} alt="" className="token-logo" />
                  {!multiple && <div>{token.symbol}</div>}
                </Fragment>
              ))}
            </Space>
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}

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
  justify-content: center;
  align-items: center;
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

  .placeholder {
    color: var(--gray-color-2);
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

  .token-logo {
    height: 20px;
    width: auto;
  }
`;
