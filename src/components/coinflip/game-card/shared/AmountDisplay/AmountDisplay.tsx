import { TerraAPI } from '@/api/terra';
import { TokenSymbol } from '@/constants/tokens';
import { useTokens } from '@/hooks';
import { round } from '@/utils/format';
import { Space } from 'antd';
import * as CSS from 'csstype';
import { FC } from 'react';
import styled from 'styled-components';

export interface AmountDisplayProps {
  uAmount: string;
  tokenSymbol: TokenSymbol;
  color?: CSS.Property.Color;
  withLeadingPlus?: boolean;
}

export const AmountDisplay: FC<AmountDisplayProps> = ({
  uAmount,
  tokenSymbol,
  color = '#ffffff',
  withLeadingPlus = false,
}) => {
  const { findToken } = useTokens();

  const token = findToken(tokenSymbol);
  const tokenAmount = round(TerraAPI.utils.fromUAmount(uAmount, tokenSymbol), 6);

  const tokenAmountString = `${tokenAmount > 0 && withLeadingPlus ? '+' : ''}${tokenAmount}`;

  const shouldShowTicker = tokenAmountString.length <= 3;

  const fontSize = tokenAmountString.length <= 8 ? '14px' : '12px';

  return (
    <WrapperStyled fontSize={fontSize} color={color}>
      <Space>
        <span>
          {tokenAmountString}
          {shouldShowTicker && <span>&nbsp;{token.ticker}</span>}
        </span>
        <div className="token-logo flex flex-align-center">
          <img src={token.logo} alt={token.ticker} />
        </div>
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

  .token-logo img, .token-logo svg {
    width: 16px;
    height: auto;
  }
`;
