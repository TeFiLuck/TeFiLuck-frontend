import LOGO_PICTURE from '@/assets/images/logo-picture.png';
import { BaseSize } from '@/typings/general';
import { FC } from 'react';
import styled from 'styled-components';

export interface UiLogoProps {
  size?: BaseSize;
}

export const UiLogo: FC<UiLogoProps> = ({ size = 'medium' }) => {
  return (
    <LogoStyled size={size}>
      <img className="logo-picture" src={LOGO_PICTURE} alt="" />
      <div className="name">
        <div className="name-part-1">TEFI</div>
        <div className="name-part-2">LUCK</div>
      </div>
    </LogoStyled>
  );
};

const LogoStyled = styled.div<{
  size: BaseSize;
}>`
  --ui-logo-font-size: 30px;
  --ui-logo-picture-height: 42px;
  --ui-logo-picture-offset: 10px;
  --ui-logo-name-parts-offset: 2px;

  user-select: none;
  display: flex;
  align-items: center;

  .logo-picture {
    height: var(--ui-logo-picture-height);
    margin-right: var(--ui-logo-picture-offset);
  }

  .name {
    display: flex;
    font-size: var(--ui-logo-font-size);
    font-weight: 800;
  }

  .name-part-1 {
    color: var(--white-color);
    margin-right: var(--ui-logo-name-parts-offset);
  }

  .name-part-2 {
    color: var(--global-primary-color);
  }

  ${({ size }) => `
    ${
  size === 'small'
    ? `
      --ui-logo-font-size: 24px;
      --ui-logo-picture-height: 32px;
      --ui-logo-picture-offset: 8px;
    `
    : ''
}
  

    ${
  size === 'large'
    ? `
      --ui-logo-font-size: 42px;
      --ui-logo-picture-height: 54px;
      --ui-logo-picture-offset: 12px;
      --ui-logo-name-parts-offset: 4px;
    `
    : ''
}
  `}
`;
