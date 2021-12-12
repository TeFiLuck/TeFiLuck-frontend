import { Space } from 'antd';
import * as CSS from 'csstype';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export interface AmountDisplayProps {
  amount: string | number;
  ticker: string;
  logo: ReactNode;
  color?: CSS.Property.Color;
}

export const AmountDisplay: FC<AmountDisplayProps> = ({ amount, ticker, logo, color = '#ffffff' }) => {
  const shouldShowTicker = String(amount).length <= 3;

  const fontSize = String(amount).length <= 8 ? '14px' : '12px';

  return (
    <WrapperStyled fontSize={fontSize} color={color}>
      <Space>
        <span>
          {amount}
          {shouldShowTicker && <span>&nbsp;{ticker}</span>}
        </span>
        <div className="token-logo flex flex-align-center">{logo}</div>
      </Space>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{
  fontSize: CSS.Property.FontSize;
  color: CSS.Property.Color;
}>`
  background: var(--dark-color-2);
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  width: 120px;
  overflow: hidden;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ fontSize, color }) => `
    font-size: ${fontSize};
    color: ${color};
  `}

  .token-logo svg, .token-logo svg {
    width: 16px;
    height: auto;
  }
`;
