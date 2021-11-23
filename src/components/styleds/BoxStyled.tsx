import { BaseSize } from '@/typings/app';
import styled from 'styled-components';

export const BoxStyled = styled.div<{
  size: BaseSize;
}>`
  --box-height: 40px;
  --box-border-radius: 4px;
  --side-padding: 12px;

  border-radius: var(--box-border-radius);
  height: var(--box-height);
  padding: 0 var(--side-padding);

  background: var(--dark-color-5);
  border: 1px solid var(--dark-color-3);
  box-sizing: border-box;

  ${({ size }) =>
    size === 'small'
      ? `
    --box-height: 32px;
    --side-padding: 6px;
  `
      : ''}

  ${({ size }) =>
    size === 'large'
      ? `
    --box-height: 48px;
  `
      : ''}
`;
