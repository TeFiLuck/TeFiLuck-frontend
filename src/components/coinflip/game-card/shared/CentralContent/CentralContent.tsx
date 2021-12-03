import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export interface CentralContentProps {
  signText?: ReactNode;
  signTextUppercase?: boolean;
  actionContent?: ReactNode;
}

export const CentralContent: FC<CentralContentProps> = ({
  children,
  signText,
  signTextUppercase = false,
  actionContent,
}) => {
  return (
    <WrapperStyled>
      {signText && <SignTextStyled uppercase={signTextUppercase}>{signText}</SignTextStyled>}
      <ContentStyled>
        {children}
        {actionContent && <ActionContentStyled>{actionContent}</ActionContentStyled>}
      </ContentStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SignTextStyled = styled.div<{
  uppercase: boolean;
}>`
  margin-bottom: 4px;
  font-size: 8px;
  font-weight: 600;
  color: var(--white-color);

  ${({ uppercase }) =>
    uppercase
      ? `
    text-transform: uppercase;
  `
      : ''}
`;

const ContentStyled = styled.div`
  position: relative;
`;

const ActionContentStyled = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;
