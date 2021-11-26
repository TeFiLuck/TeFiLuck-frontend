import { TokenSymbol } from '@/constants/tokens';
import { Token } from '@/typings/finance-management';
import { Menu, Space } from 'antd';
import isEqual from 'lodash/isEqual';
import { FC, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

export interface UiTokensDropdownBodyProps {
  tokens: Token[];
  selected?: TokenSymbol[];
  multiple?: boolean;
  allowEmpty?: boolean;
  setDropdownVisibility?: (isVisible: boolean) => void;
  onChange?: (symbols: TokenSymbol[]) => void;
}

export const UiTokensDropdownBody: FC<UiTokensDropdownBodyProps> = ({
  tokens,
  selected = [],
  multiple = false,
  allowEmpty = true,
  setDropdownVisibility = () => {},
  onChange = () => {},
}) => {
  const [selectedSymbols, setSelectedSymbols] = useState([...selected]);

  const selectableTokens = tokens.filter((token) => {
    return multiple || !selectedSymbols.includes(token.symbol);
  });

  // Two-way binding
  useEffect(() => {
    setSelectedSymbols([...selected]);
  }, [selected]);

  useEffect(() => {
    if (!isEqual(selected, selectedSymbols)) {
      onChange(selectedSymbols);
    }
  }, [selectedSymbols]);

  // Item selection
  function handleItemClick({ key }: any): void {
    if (isSymbolSelected(key)) unselectSymbol(key);
    else selectSymbol(key);
    setDropdownVisibility(false);
  }

  function isSymbolSelected(symbol: TokenSymbol): boolean {
    return selectedSymbols.includes(symbol);
  }

  function selectSymbol(symbol: TokenSymbol): void {
    if (multiple) {
      const selectedSymbolsCopy = [...selectedSymbols];
      selectedSymbolsCopy.push(symbol);
      setSelectedSymbols(selectedSymbolsCopy);
    } else {
      setSelectedSymbols([symbol]);
    }
  }

  function unselectSymbol(symbol: TokenSymbol): void {
    const selectedSymbolsCopy = [...selectedSymbols];

    if (selectedSymbolsCopy.length === 1 && !allowEmpty) return;

    if (selectedSymbolsCopy.includes(symbol)) {
      selectedSymbolsCopy.splice(selectedSymbolsCopy.indexOf(symbol), 1);
      setSelectedSymbols(selectedSymbolsCopy);
    }
  }

  return (
    <WrapperStyled multiple={multiple} onClick={handleItemClick} selectedKeys={selectedSymbols}>
      {selectableTokens.map((token, index) => (
        <Fragment key={`dropdown_item_${index}}`}>
          {index !== 0 && <Menu.Divider key={`divider_${token.symbol}`} />}

          <Menu.Item key={token.symbol}>
            <OptionStyled>
              <Space>
                <IconContainerStyled>
                  <img src={token.logo} alt="" className="icon" />
                </IconContainerStyled>
                <div>{token.symbol}</div>
              </Space>
            </OptionStyled>
          </Menu.Item>
        </Fragment>
      ))}
    </WrapperStyled>
  );
};

const WrapperStyled = styled(Menu)`
  border-right: none;
  width: 100%;
  border-radius: 4px;

  .ant-menu-item {
    margin-bottom: 0px !important;
    margin-top: 0px;
  }
`;

const OptionStyled = styled.div`
  user-select: none;
`;

const IconContainerStyled = styled.div`
  display: flex;
  align-items: center;

  .icon {
    width: 18px;
    font-size: 18px;
  }
`;
