import { Button, ButtonProps } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

type ButtonTheme = 'inherit' | 'success' | 'danger' | 'warning' | 'dark-3' | 'alternative';

export interface UiButtonProps extends ButtonProps {
  type?: ButtonProps['type'];
  theme?: ButtonTheme;
  ghost?: boolean;
  disabled?: boolean;
  className?: string;
  uppercase?: boolean;
}

export const UiButton: FC<UiButtonProps> = ({
  children,
  type = 'default',
  theme = 'inherit',
  ghost = false,
  disabled = false,
  className = '',
  uppercase = false,
  ...restProps
}) => {
  const customClassName = `${disabled ? 'btn-disabled' : ''}`;

  return (
    <ButtonStyled
      theme={theme}
      type={type}
      ghost={ghost}
      disabled={disabled}
      className={customClassName}
      uppercase={uppercase ? 1 : 0}
      {...restProps}
    >
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled(Button)<{
  theme: ButtonTheme;
  type: ButtonProps['type'];
  ghost: boolean;
  disabled: boolean;
  uppercase: 0 | 1;
}>`
  ${({ uppercase }) =>
    uppercase
      ? `
    text-transform: uppercase;
  `
      : ''}

  ${({ type, theme, ghost }) =>
    type === 'primary'
      ? `
    --ui-button-bg-color: default;
    --ui-button-border-color: var(--ui-button-bg-color);
    --ui-button-text-color: var(--white-color);

    ${
  theme !== 'inherit'
    ? `
      &:not(.btn-disabled):hover {
        opacity: 0.75;
      }

      &:not(.btn-disabled):focus {
        opacity: 0.85;
      }

      &:not(.btn-disabled):active {
        opacity: 1;
      }

      ${
  !ghost
    ? `
        background: var(--ui-button-bg-color);
        border-color: var(--ui-button-border-color);
        color: var(--ui-button-text-color);

        &:hover, &:active, &:focus {
          background: var(--ui-button-bg-color);
          border-color: var(--ui-button-border-color);
        }
      `
    : `
        border-color: var(--ui-button-border-color) !important;
        color: var(--ui-button-border-color) !important;

        &:hover, &:active, &:focus {
          background: var(--ui-button-bg-color);
          border-color: var(--ui-button-border-color);
        }
      `
}
    `
    : ''
}

    ${
  theme === 'success'
    ? `
      --ui-button-bg-color: var(--global-success-color);
    `
    : ''
}

    ${
  theme === 'danger'
    ? `
      --ui-button-bg-color: var(--global-danger-color);
    `
    : ''
}

    ${
  theme === 'warning'
    ? `
      --ui-button-bg-color: var(--global-warning-color);
    `
    : ''
}

    ${
  theme === 'dark-3'
    ? `
      --ui-button-bg-color: var(--dark-color-3);
      --ui-button-text-color: var(--global-text-color);
    `
    : ''
}

    ${
  theme === 'alternative'
    ? `
      --ui-button-bg-color: var(--global-alternative-color);
    `
    : ''
}
  `
      : ''}


  ${({ type, theme }) =>
    type === 'default'
      ? `
    --ui-button-border-color: default;
    --ui-button-text-color: var(--global-text-color);

    ${
  theme !== 'inherit'
    ? `
      &:not(.btn-disabled):hover {
        opacity: 0.75;
      }

      &:not(.btn-disabled):focus {
        opacity: 0.85;
      }

      &:not(.btn-disabled):active {
        opacity: 1;
      }

      &:hover, &:active, &:focus {
        color: var(--ui-button-border-color);
        border-color: var(--ui-button-border-color);
      }
    `
    : ''
}

    ${
  theme === 'success'
    ? `
      --ui-button-border-color: var(--global-success-color);
    `
    : ''
}

    ${
  theme === 'danger'
    ? `
      --ui-button-border-color: var(--global-danger-color);
    `
    : ''
}

    ${
  theme === 'warning'
    ? `
      --ui-button-border-color: var(--global-warning-color);
    `
    : ''
}

    ${
  theme === 'alternative'
    ? `
      --ui-button-border-color: var(--global-alternative-color);
    `
    : ''
}

    ${
  theme === 'dark-3'
    ? `
      --ui-button-border-color: var(--dark-color-3);
    `
    : ''
}
  `
      : ''}
`;
