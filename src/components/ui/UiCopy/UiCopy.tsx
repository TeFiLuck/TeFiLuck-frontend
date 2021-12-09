import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { UiLink, UiLinkProps } from '../UiLink/UiLink';

export interface UiCopyProps
  extends Omit<UiLinkProps, 'to' | 'mode' | 'openHtmlLinkSeparately' | 'active' | 'onClick'> {
  target: string;
  copyButtonContent?: string;
  onClick?: () => void;
}

export const UiCopy: FC<UiCopyProps> = ({ target, copyButtonContent = 'Copy', onClick = () => {}, ...restProps }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const textareaElement = useRef<HTMLTextAreaElement>(null);

  function changeButtonStatus(): void {
    if (timeoutId) window.clearTimeout(timeoutId);
    setIsCopied(true);
    setTimeoutId(window.setTimeout(() => setIsCopied(false), 3000));
  }

  function copyValue(): void {
    textareaElement.current?.select();
    textareaElement.current?.setSelectionRange(0, target.length);
    document.execCommand('copy');
  }

  function handleClick(): void {
    if (!isCopied) {
      changeButtonStatus();
      copyValue();
      onClick();
    }
  }

  return (
    <WrapperStyled>
      <UiLink {...restProps} mode="empty" active={isCopied} onClick={handleClick}>
        <ContentStyled>
          <div className="button-text">{isCopied ? 'Copied!' : copyButtonContent}</div>
          {isCopied ? <CheckOutlined /> : <CopyOutlined />}
        </ContentStyled>
      </UiLink>

      <TextareaStyled ref={textareaElement} value={target} readOnly />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  position: relative;
  overflow: hidden;
`;

const ContentStyled = styled.div`
  display: flex;
  align-items: center;

  .button-text {
    margin-right: 4px;
  }
`;

const TextareaStyled = styled.textarea`
  position: absolute;
  opacity: 0;
`;
