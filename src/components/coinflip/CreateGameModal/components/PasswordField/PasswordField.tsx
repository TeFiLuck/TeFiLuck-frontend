import ChoiceEncryptionPasswordField, {
  ChoiceEncryptionPasswordFieldProps,
} from '@/components/coinflip/ChoiceEncryptionPasswordField/ChoiceEncryptionPasswordField';
import { UiCopy } from '@/components/ui';
import { ENCRYPTION_PASSWORD_SEPARATOR } from '@/constants/coinflip';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export type PasswordFieldProps = ChoiceEncryptionPasswordFieldProps;

const PasswordField: FC<PasswordFieldProps> = ({ ...restProps }) => {
  return (
    <Space direction="vertical">
      <div>
        <LabelStyled>
          <Tooltip
            title={
              <span>
                Because your side-choice needs to be transferred via blockchain(means publicly visible) - IT MUST BE
                ENCRYPTED.
                <br />
                <br />
                <b>
                  Encryption formula: SHA256(
                  <span className="text-color-info">side</span>
                  <span className="text-color-danger">{ENCRYPTION_PASSWORD_SEPARATOR}</span>
                  <span className="text-color-warning">password</span>)
                </b>
              </span>
            }
            className="cursor-help"
            placement="topRight"
          >
            Choice encryption password&nbsp;
            <span className="text-color-info">
              <QuestionCircleFilled />
            </span>
          </Tooltip>

          <UiCopy target={`${restProps.selectedSide}${ENCRYPTION_PASSWORD_SEPARATOR}${restProps.value}`} />
        </LabelStyled>
      </div>

      <ChoiceEncryptionPasswordField {...restProps} />
    </Space>
  );
};

const LabelStyled = styled.span`
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default PasswordField;
