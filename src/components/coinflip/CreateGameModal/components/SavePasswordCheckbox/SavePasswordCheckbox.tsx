import { QuestionCircleFilled } from '@ant-design/icons';
import { Checkbox, Tooltip } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export interface SavePasswordCheckboxProps {
  value: boolean;
  onChange: (isChecked: boolean) => void;
}

const SavePasswordCheckbox: FC<SavePasswordCheckboxProps> = ({ value, onChange }) => {
  return (
    <CheckboxStyled checked={value} onChange={(e) => onChange(e.target.checked)}>
      Save password locally (in browser)&nbsp;
      <Tooltip title="We store passwords only inside your computer. No 3rd party involved." className="tooltip">
        <span className="text-color-info">
          <QuestionCircleFilled />
        </span>
      </Tooltip>
    </CheckboxStyled>
  );
};

const CheckboxStyled = styled(Checkbox)`
  user-select: none;

  .ant-checkbox {
    font-size: 19px;
  }

  .tooltip {
    cursor: help;
  }
`;

export default SavePasswordCheckbox;
