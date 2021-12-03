import styled from 'styled-components';

export const InfoBoxStyled = styled.div`
  border-radius: 8px;
  padding: 8px;
  background: var(--dark-color-2);
  box-sizing: border-box;
`;

export const InfoBoxStatStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;

  &:first-child {
    margin-top: 0;
  }
`;

export const InfoBoxLabelStyled = styled.div`
  font-size: 10px;
  margin-right: 6px;
  color: var(--gray-color-3);
  user-select: none;
`;

export const InfoBoxStatValueStyled = styled.div`
  font-weight: 600;
  color: var(--white-color);
`;
