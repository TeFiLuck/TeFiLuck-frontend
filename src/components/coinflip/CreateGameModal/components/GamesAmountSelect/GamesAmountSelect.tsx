import { Token } from '@/typings/finance-management';
import { Select } from 'antd';
import { FC, useEffect } from 'react';

export interface GamesAmountSelectProps {
  value: number;
  token: Token;
  betSize: number;
  onChange: (amount: number) => void;
}

const GamesAmountSelect: FC<GamesAmountSelectProps> = ({ value, token, betSize, onChange }) => {
  function isAmountItemDisabled(amount: number): boolean {
    return token.balance < amount * betSize;
  }

  useEffect(() => {
    if (isAmountItemDisabled(value)) {
      onChange(1);
    }
  }, [token, betSize]);

  return (
    <Select value={value} size="large" bordered={false} onChange={onChange}>
      <Select.Option value={1}>1x</Select.Option>
      <Select.Option value={2} disabled={isAmountItemDisabled(2)}>
        2x
      </Select.Option>
      <Select.Option value={3} disabled={isAmountItemDisabled(3)}>
        3x
      </Select.Option>
      <Select.Option value={5} disabled={isAmountItemDisabled(5)}>
        5x
      </Select.Option>
      <Select.Option value={10} disabled={isAmountItemDisabled(10)}>
        10x
      </Select.Option>
    </Select>
  );
};

export default GamesAmountSelect;
