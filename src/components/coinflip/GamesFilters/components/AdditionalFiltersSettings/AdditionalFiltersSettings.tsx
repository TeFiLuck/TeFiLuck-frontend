import { BoxStyled } from '@/components/styleds';
import { BaseSize } from '@/typings/app';
import { SettingFilled } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import AdditionalFiltersSettingsDropdownBody from './components/AdditionalFiltersSettingsDropdownBody/AdditionalFiltersSettingsDropdownBody';

export interface AdditionalFiltersSettingsProps {
  size?: BaseSize;
  fixed?: boolean;
  disabled?: boolean;
}

const AdditionalFiltersSettings: FC<AdditionalFiltersSettingsProps> = ({
  size = 'medium',
  fixed = false,
  disabled = false,
}) => {
  /* Display details */
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const dropdownTrigger = useRef<HTMLDivElement>(null);

  function handleKeyPress(e: any): void {
    if (e.key === 'Enter' && !disabled) {
      setDropdownVisibility(!isDropdownVisible);
      handleClick();
    }
  }

  function handleClick(): void {
    dropdownTrigger.current?.blur();
  }

  const overlayStyle: Record<string, string> = {};
  if (fixed) overlayStyle.position = 'fixed';

  return (
    <Dropdown
      overlay={<AdditionalFiltersSettingsDropdownBody />}
      placement="bottomRight"
      overlayStyle={overlayStyle}
      trigger={['click']}
      disabled={disabled}
      arrow
      visible={isDropdownVisible}
      onVisibleChange={(isVisible) => setDropdownVisibility(isVisible)}
    >
      <ContentStyled
        ref={dropdownTrigger}
        size={size}
        active={isDropdownVisible}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
      >
        <SettingFilled />
      </ContentStyled>
    </Dropdown>
  );
};

const ContentStyled = styled(BoxStyled)<{
  active: boolean;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: 0.2s all;
  outline: none;
  font-size: 16px;

  ${({ active }) =>
    active
      ? `
    border-color: var(--global-primary-color);
    color: var(--global-primary-color);
  `
      : ''}

  ${({ disabled }) =>
    disabled
      ? `
    cursor: not-allowed;
    opacity: 0.5;
  `
      : `
    cursor: pointer;
    &:hover, &:focus {
      border-color: var(--global-primary-color);
    }

    &:hover {
      color: var(--global-primary-color);
    }
  `}
`;

export default AdditionalFiltersSettings;
