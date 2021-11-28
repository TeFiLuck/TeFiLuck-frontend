import { StylingVariablesMap } from '@/typings/general';
import * as CSS from 'csstype';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

type Mode = 'router' | 'html' | 'empty';
type LinkProps = {
  to: string;
  href?: string;
  target?: '_blank';
};

export interface UiLinkProps {
  to?: string;
  mode?: Mode;
  openHtmlLinkSeparately?: boolean;
  active?: boolean;
  disabled?: boolean;
  uppercase?: boolean;
  underlined?: boolean;
  fontSize?: CSS.Property.FontSize;
  fontWeight?: CSS.Property.FontWeight;
  color?: CSS.Property.Color;
  hoverColor?: CSS.Property.Color;
  disabledColor?: CSS.Property.Color;
  style?: Record<string, string>;
  onClick?: () => void;
}

export const UiLink: FC<UiLinkProps> = ({
  children,
  to = '/',
  mode = 'router',
  openHtmlLinkSeparately = false,
  active = false,
  disabled = false,
  uppercase = false,
  underlined = false,
  fontSize = '100%',
  fontWeight = '700',
  color = '',
  hoverColor = '',
  disabledColor = '',
  style = {},
  onClick = () => {},
}) => {
  const wrapperElementsMap = {
    router: NavLink,
    html: 'a',
    empty: 'div',
  };

  const linkProps: LinkProps = { to: '' };

  if (mode === 'router') linkProps.to = to;
  if (mode === 'html') {
    linkProps.href = to;
    if (openHtmlLinkSeparately) linkProps.target = '_blank';
  }

  const styleVariables: StylingVariablesMap = {
    '--ui-link-color': color || 'var(--gray-color-2)',
    '--ui-link-hover-color': hoverColor || 'var(--global-primary-color)',
    '--ui-link-disabled-color': disabledColor || 'var(--gray-color-3)',
  };

  function handleClick(e: any): void {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick();
  }

  function handleKeyPress(e: React.KeyboardEvent): void {
    if (e.key === 'Enter') handleClick(e);
  }

  /*
    Be aware of react-dom warning: Received `true|false` for a non-boolean attribute.
    The reason uppercase flag is passed as 0 | 1;
  */
  return (
    <UiLinkWrapperStyled
      as={wrapperElementsMap[mode]}
      {...linkProps}
      tabIndex={disabled ? -1 : 0}
      className={`${active && 'active'}`}
      disabled={disabled}
      uppercase={uppercase ? 1 : 0}
      underlined={underlined ? 1 : 0}
      fontSize={fontSize}
      fontWeight={fontWeight}
      style={{ ...styleVariables, ...style }}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
    >
      {children}
    </UiLinkWrapperStyled>
  );
};

const UiLinkWrapperStyled = styled(NavLink)<{
  disabled: boolean;
  uppercase: 0 | 1;
  underlined: 0 | 1;
  fontSize: CSS.Property.FontSize;
  fontWeight: CSS.Property.FontWeight;
}>`
  ${({ fontSize, fontWeight, uppercase, underlined }) => `
    font-weight: ${fontWeight};
    font-size: ${fontSize};

    ${(uppercase && 'text-transform: uppercase;') || ''} 
    ${(underlined && 'text-decoration: underline !important;') || ''} 
  `}

  color: var(--ui-link-color);
  text-decoration: none;
  transition: 0.3s all;
  user-select: none;
  cursor: pointer;

  ${({ disabled }) =>
    disabled
      ? `
    cursor: not-allowed;
    opacity: 0.7;

    &:not(.active) {
      color: var(--ui-link-disabled-color);
    }
  `
      : `
    &:not(.active):focus {
      opacity: 0.7;
    }

    &:not(.active):hover {
      color: var(--ui-link-hover-color);
    }

    &:not(.active):active {
      opacity: 0.7;
    }
  `}

  &.active {
    color: var(--ui-link-hover-color);
  }
`;
