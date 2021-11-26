import { Space, Switch } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export interface MyGamesSwitchProps {
  amountGames: number;
  value: boolean;
  disabled?: boolean;
  onChange: (isActive: boolean) => void;
}

const MyGamesSwitch: FC<MyGamesSwitchProps> = ({ amountGames, value, disabled = false, onChange }) => {
  return (
    <Space>
      <LabelStyled>
        My <span className="amount-games">({amountGames})</span>
      </LabelStyled>
      <Switch checked={value} disabled={disabled} onChange={onChange} />
    </Space>
  );
};

const LabelStyled = styled.span`
  font-size: 16px;
  color: var(--white-color);
  font-weight: 500;
  user-select: none;

  .amount-games {
    color: var(--global-primary-color);
  }
`;

export default MyGamesSwitch;
