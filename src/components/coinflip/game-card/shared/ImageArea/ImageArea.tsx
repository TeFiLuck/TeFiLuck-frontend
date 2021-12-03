import * as CSS from 'csstype';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export interface ImageAreaProps {
  children: ReactNode;
  areaSize?: CSS.Property.Width;
  imageWidth?: CSS.Property.Width;
  imageColor?: CSS.Property.Color;
  borderColor?: CSS.Property.Color;
}

export const ImageArea: FC<ImageAreaProps> = ({
  children,
  areaSize = '100px',
  imageWidth = '55px',
  imageColor = 'rgba(0,0,0,0.5)',
  borderColor = 'transparent',
}) => {
  return (
    <WrapperStyled areaSize={areaSize} imageWidth={imageWidth} imageColor={imageColor} borderColor={borderColor}>
      {children}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{
  areaSize: CSS.Property.Width;
  imageWidth: CSS.Property.Width;
  imageColor: CSS.Property.Color;
  borderColor: CSS.Property.Color;
}>`
  border-radius: 50%;
  background: var(--dark-color-2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  user-select: none;
  border: 1px solid transparent;
  transition: 0.2s all;

  ${({ borderColor, areaSize, imageColor, imageWidth }) => `
    border-color: ${borderColor};
    width: ${areaSize};
    height: ${areaSize};
    color: ${imageColor};
    font-size: ${imageWidth};
  `};

  svg,
  img {
    transition: 0.2s all;
    ${({ imageColor, imageWidth }) => `
      width: ${imageWidth};
      fill: ${imageColor};
    `}
  }
`;
