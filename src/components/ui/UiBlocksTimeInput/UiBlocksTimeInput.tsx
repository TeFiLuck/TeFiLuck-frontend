import { round } from '@/utils/format';
import { getHoursFromTerraBlocksAmount, getTerraBlocksAmountFromHours } from '@/utils/networks';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UiNumberInput } from '../UiNumberInput/UiNumberInput';

export interface UiBlocksTimeInputProps {
  value: number;
  minBlocks?: number;
  maxBlocks?: number;
  disabled?: boolean;
  style?: Record<string, string>;
  onChange: (blocksAmount: number) => void;
}

export const UiBlocksTimeInput: FC<UiBlocksTimeInputProps> = ({
  value,
  minBlocks = 100,
  maxBlocks = 1000000,
  disabled = false,
  style = {},
  onChange,
}) => {
  const [hoursValue, setHoursValue] = useState(getHoursFromTerraBlocksAmount(value).toString());

  useEffect(() => {
    const estimatedHours = getHoursFromTerraBlocksAmount(value);
    if (estimatedHours !== Number(hoursValue)) {
      setHoursValue(estimatedHours.toString());
    }
  }, [value]);

  useEffect(() => {
    const blocksAmount = getTerraBlocksAmountFromHours(Number(hoursValue));
    if (blocksAmount !== value) {
      onChange(blocksAmount);
    }
  }, [hoursValue]);

  return (
    <WrapperStyled>
      <UiNumberInput
        value={hoursValue}
        size="large"
        decimals={1}
        min={round(getHoursFromTerraBlocksAmount(minBlocks), 1)}
        max={round(getHoursFromTerraBlocksAmount(maxBlocks), 1)}
        style={{ ...style }}
        onChange={setHoursValue}
        disabled={disabled}
        prefix={
          <InputPrefixStyled>
            <FieldTimeOutlined className="icon" />
          </InputPrefixStyled>
        }
        addonAfter={<span className="noselect">hours</span>}
      />

      <span className="equals-sign"> &#8776; </span>

      <Space className="nowrap noselect">
        <span className="blocks-number">{value}</span>
        <span>blocks</span>
      </Space>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .equals-sign {
    margin: 0 12px;
    font-size: 24px;
    font-weight: 500;
    user-select: none;
  }

  .blocks-number {
    font-size: 20px;
    font-weight: 600;
    color: var(--white-color);
  }
`;

const InputPrefixStyled = styled.div`
  margin-right: 6px;
  display: flex;
  align-items: center;

  .icon {
    font-size: 18px;
  }
`;
