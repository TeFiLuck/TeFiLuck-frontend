import { CoinSide, ENCRYPTION_PASSWORD_SEPARATOR, GENERATED_ENCRYPTION_PASSWORD_LENGTH } from '@/constants/coinflip';
import { generateRandomString } from '@/utils/common';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Input, Space, Switch, Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

export interface ChoiceEncryptionPasswordFieldProps {
  value: string;
  selectedSide: CoinSide;
  switchSize?: 'default' | 'small';
  onChange: (password: string) => void;
}

const ChoiceEncryptionPasswordField: FC<ChoiceEncryptionPasswordFieldProps> = ({
  value,
  selectedSide,
  switchSize = 'default',
  onChange,
}) => {
  const [isGenerated, setIsGenerated] = useState(true);

  useEffect(() => {
    if (isGenerated) {
      onChange(generateRandomString(GENERATED_ENCRYPTION_PASSWORD_LENGTH));
    } else {
      onChange('');
    }
  }, [isGenerated]);

  function handleChange(event: any): void {
    onChange(event.target.value);
  }

  return (
    <WrapperStyled>
      <Input.Password
        value={value}
        size="large"
        disabled={isGenerated}
        prefix={
          <span className="noselect">
            {selectedSide}
            {ENCRYPTION_PASSWORD_SEPARATOR}
          </span>
        }
        onChange={handleChange}
      />
      <Space className="generation-mode">
        <Tooltip
          title={
            <span>
              {!isGenerated && (
                <span>
                  <b className="text-color-danger">Password MUST be strong and MUST be unique each time!</b>
                  <br />
                </span>
              )}
              Generated password is crypto-random string of <b>{GENERATED_ENCRYPTION_PASSWORD_LENGTH} symbols</b>.
              <br />
              <i>
                We will auto-download you .txt file, <b>but we suggest to save it at some place as well.</b>
              </i>
            </span>
          }
          placement="topRight"
        >
          <SwitchLabelStyled>
            <Space size={4}>
              <span className={isGenerated ? '' : 'text-color-danger'}>Generated</span>
              <span className={isGenerated ? 'text-color-info' : 'text-color-danger'}>
                <QuestionCircleFilled />
              </span>
            </Space>
          </SwitchLabelStyled>
        </Tooltip>
        <Switch checked={isGenerated} size={switchSize} onChange={setIsGenerated} />
      </Space>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .generation-mode {
    margin-left: 16px;
  }
`;

const SwitchLabelStyled = styled.span`
  user-select: none;
  font-weight: 500;
  cursor: help;
`;

export default ChoiceEncryptionPasswordField;
