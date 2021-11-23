import { ReactComponent as CoinsIcon } from '@/assets/images/coins.svg';
import { Token } from '@/typings/finance-management';
import { Space } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';
import { UiButton } from '../UiButton/UiButton';
import { UiNumberInput } from '../UiNumberInput/UiNumberInput';

export interface UiTokenAmountInputProps {
  token: Token;
  value: string;
  min?: number;
  decimals?: number;
  allowClear?: boolean;
  style?: Record<string, number | string>;
  onChange: (value: string) => void;
}

export const UiTokenAmountInput: FC<UiTokenAmountInputProps> = ({
  token,
  value,
  min = 0,
  decimals = 3,
  allowClear = true,
  style = {},
  onChange,
}) => {
  function handleClearClick(): void {
    onChange(String(min));
  }

  function handleMaxClick(): void {
    onChange(String(token.balance));
  }

  return (
    <UiNumberInput
      value={value}
      min={min}
      max={token.balance || Number(value)}
      decimals={decimals}
      size="large"
      style={{ ...style }}
      prefix={
        <InputPrefix>
          <CoinsIcon className="icon" />
        </InputPrefix>
      }
      addonAfter={
        <Space>
          {allowClear && (
            <UiButton size="small" theme="dark-3" type="primary" uppercase onClick={handleClearClick}>
              Clear
            </UiButton>
          )}
          <UiButton size="small" theme="dark-3" type="primary" uppercase onClick={handleMaxClick}>
            Max
          </UiButton>
        </Space>
      }
      onChange={onChange}
    />
  );
};

const InputPrefix = styled.div`
  margin-right: 6px;
  display: flex;
  align-items: center;

  .icon {
    height: 20px;
  }
`;
