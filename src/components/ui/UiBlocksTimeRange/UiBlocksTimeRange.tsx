import { round } from '@/utils/format';
import { getHoursFromTerraBlocksAmount, getTerraBlocksAmountFromHours } from '@/utils/networks';
import { Slider } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export interface UiBlocksTimeRangeProps {
  value: [number, number];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange: (blocksAmountRange: [number, number]) => void;
}

export const UiBlocksTimeRange: FC<UiBlocksTimeRangeProps> = ({
  value,
  min = 600,
  max = 43200,
  step = 300,
  disabled = false,
  onChange,
}) => {
  const minHours = round(getHoursFromTerraBlocksAmount(min), 1);
  const maxHours = round(getHoursFromTerraBlocksAmount(max), 1);
  const stepHours = round(getHoursFromTerraBlocksAmount(step), 1) || 1;

  function handleChange([fromHours, toHours]: [number, number]): void {
    onChange([getTerraBlocksAmountFromHours(fromHours), getTerraBlocksAmountFromHours(toHours)]);
  }

  return (
    <SliderStyled
      value={[round(getHoursFromTerraBlocksAmount(value[0]), 1), round(getHoursFromTerraBlocksAmount(value[1]), 1)]}
      range
      min={minHours}
      max={maxHours}
      step={stepHours}
      marks={{
        [minHours]: minHours,
        [maxHours]: maxHours,
      }}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

const SliderStyled = styled(Slider)`
  .ant-slider-with-marks {
    margin-bottom: 20px;
  }

  .ant-slider-mark-text {
    font-size: 10px;
  }
`;
