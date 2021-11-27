import { useIsMounted } from '@/hooks';
import { StylingVariablesMap } from '@/typings/general';
import { CloseOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import * as CSS from 'csstype';
import { FC, ReactNode, useEffect, useState } from 'react';
import SimpleBarReact from 'simplebar-react';
import styled from 'styled-components';

export interface UiModalProps {
  visible: boolean;
  centered?: boolean;
  loading?: boolean;
  loadingText?: string;
  mask?: boolean;
  destroyOnClose?: boolean;
  hideDividerHeader?: boolean;
  hideDividerFooter?: boolean;
  width?: CSS.Property.Width;
  bodyHeight?: CSS.Property.Height;
  borderRadius?: CSS.Property.BorderRadius;
  verticalOffset?: CSS.Property.Margin;
  horizontalOffset?: CSS.Property.Margin;
  headerPadding?: CSS.Property.Padding;
  footerPadding?: CSS.Property.Padding;
  header?: (data: UiModalScopedSlotsPayload) => ReactNode;
  topBanner?: (data: UiModalScopedSlotsPayload) => ReactNode;
  footer?: (data: UiModalScopedSlotsPayload) => ReactNode;
  onChange: (isVisible: boolean) => void;
  onClosed?: () => void;
  onOpened?: () => void;
  onCloseIconClick?: () => void;
}

export interface UiModalScopedSlotsPayload {
  closeModal: () => void;
}

export const UiModal: FC<UiModalProps> = ({
  children,
  visible,
  centered = true,
  loading = false,
  loadingText = 'Loading...',
  mask = true,
  destroyOnClose = false,
  hideDividerHeader = false,
  hideDividerFooter = false,
  width = '520px',
  bodyHeight = '200px',
  borderRadius = '8px',
  verticalOffset = '8px',
  horizontalOffset = '16px',
  headerPadding = '8px 16px',
  footerPadding = '16px',
  header,
  topBanner,
  footer,
  onChange,
  onClosed = () => {},
  onOpened = () => {},
  onCloseIconClick = () => {},
}) => {
  const scopedSlotsPayload: UiModalScopedSlotsPayload = {
    closeModal,
  };

  /* Visibility */
  const [isVisible, setIsVisible] = useState(visible);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isVisible !== visible) {
      setIsVisible(visible);
    }
  }, [visible]);

  useEffect(() => {
    onChange(isVisible);
    if (isMounted) {
      if (isVisible) onOpened();
      else onClosed();
    }
  }, [isVisible]);

  function closeModal(): void {
    setIsVisible(false);
  }

  /* Styling */
  const styleVariables: StylingVariablesMap = {
    '--ui-modal-border-radius': borderRadius,
    '--ui-modal-width': width,
    '--ui-modal-header-padding': headerPadding,
    '--ui-modal-footer-padding': footerPadding,
    '--ui-modal-footer-display-mode': footer ? 'block' : 'none',
    '--ui-modal-divider-header': hideDividerHeader ? 'transparent' : 'rgba(102,102,102,0.3)',
    '--ui-modal-divider-footer': hideDividerFooter ? 'transparent' : 'rgba(102,102,102,0.3)',
  };

  return (
    <ModalStyled
      visible={isVisible}
      centered={centered}
      mask={mask}
      destroyOnClose={destroyOnClose}
      bodyStyle={{
        padding: `${verticalOffset} 0`,
        height: bodyHeight,
      }}
      style={styleVariables}
      closeIcon={<CloseOutlined style={{ fontSize: '18px' }} onClick={onCloseIconClick} />}
      title={header ? header(scopedSlotsPayload) : <div></div>}
      footer={footer && footer(scopedSlotsPayload)}
      onCancel={closeModal}
    >
      <WrapperStyled>
        <Spin spinning={loading} size="large" tip={loadingText}>
          <SimpleBarReact style={{ maxHeight: '100%' }}>
            {topBanner && topBanner(scopedSlotsPayload)}
            <ContentStyled horizontalOffset={horizontalOffset}>{children}</ContentStyled>
          </SimpleBarReact>
        </Spin>
      </WrapperStyled>
    </ModalStyled>
  );
};

const ModalStyled = styled(Modal)`
  &.ant-modal {
    width: var(--ui-modal-width) !important;
  }

  & .ant-modal-content {
    border-radius: var(--ui-modal-border-radius);
    display: grid;
    grid-template-rows: minmax(54px, auto) 1fr auto;
    box-shadow: 0px 4px 8px rgba(80, 14, 125, 0.06), 0px 8px 24px rgba(80, 14, 125, 0.06);
  }

  & .ant-modal-header {
    border-top-left-radius: var(--ui-modal-border-radius);
    border-top-right-radius: var(--ui-modal-border-radius);
    padding: var(--ui-modal-header-padding);
    border-color: var(--ui-modal-divider-header);
  }

  & .ant-modal-footer {
    padding: var(--ui-modal-footer-padding);
    display: var(--ui-modal-footer-display-mode);
    border-color: var(--ui-modal-divider-footer);
  }

  & .ant-modal-title {
    font-size: 20px;
    line-height: 44px;
    user-select: none;
    color: var(--white-color);
  }

  & .ant-modal-close {
    top: 4px;
  }

  & .ant-spin-nested-loading {
    height: 100%;
  }

  & .ant-spin-container {
    max-height: 100%;
    height: 100%;
  }
`;

const WrapperStyled = styled.div`
  height: 100%;
`;

const ContentStyled = styled.div<{
  horizontalOffset: CSS.Property.Margin;
}>`
  ${({ horizontalOffset }) => `
    margin: 0 ${horizontalOffset};
  `}

  height: 100%;
`;
