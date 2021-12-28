import { APP_GRAY_COLOR_1 } from '@/assets/styles/design';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import * as CSS from 'csstype';
import isCallable from 'is-callable';
import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

// I don't use global type GameCardMode here,
// because not all future variations can be described within this component
type CardMode = 'default' | 'compact';

type SharedScopedSlotsData = {
  showOverlay: () => void;
  hideOverlay: () => void;
  toggleOverlay: () => void;
};

export interface BaseGameCardProps {
  gameId?: string;
  mode?: CardMode;
  glowColor?: CSS.Property.Color;
  decorLinesColor?: CSS.Property.Color;
  leftDecorLineColor?: CSS.Property.Color;
  rightDecorLineColor?: CSS.Property.Color;
  hideLeftContent?: boolean;
  hideCenterContent?: boolean;
  hideRightContent?: boolean;
  title?: ReactNode | ((data: SharedScopedSlotsData) => ReactNode);
  subtitle?: ReactNode | ((data: SharedScopedSlotsData) => ReactNode);
  overlayContent?: ReactNode | ((data: SharedScopedSlotsData) => ReactNode);
  leftContent?: ReactNode | ((data: SharedScopedSlotsData) => ReactNode);
  centerContent?: ReactNode | ((data: SharedScopedSlotsData) => ReactNode);
  rightContent?: ReactNode | ((data: SharedScopedSlotsData) => ReactNode);
  topLeftContent?: ReactNode | ((data: SharedScopedSlotsData) => ReactNode);
  infoTooltip?: ReactNode | ((data: SharedScopedSlotsData) => ReactNode);
  footer?: ReactNode | ((data: SharedScopedSlotsData) => ReactNode);
}

export const BaseGameCard: FC<BaseGameCardProps> = ({
  gameId,
  mode = 'default',
  glowColor = '',
  decorLinesColor = APP_GRAY_COLOR_1,
  leftDecorLineColor = '',
  rightDecorLineColor = '',
  hideLeftContent = false,
  hideCenterContent = false,
  hideRightContent = false,
  title,
  subtitle,
  overlayContent,
  leftContent,
  centerContent,
  rightContent,
  topLeftContent,
  infoTooltip,
  footer,
}) => {
  const isDecorLinesVisible = ['default'].includes(mode);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const isInfoTooltipVisible = infoTooltip || gameId;

  const slotsSharedData: SharedScopedSlotsData = {
    showOverlay: () => setIsOverlayVisible(true),
    hideOverlay: () => setIsOverlayVisible(false),
    toggleOverlay: () => setIsOverlayVisible(!isOverlayVisible),
  };

  function displaySlot(slot: ReactNode | ((data: SharedScopedSlotsData) => ReactNode)) {
    return isCallable(slot) ? slot(slotsSharedData) : slot;
  }

  return (
    <WrapperStyled mode={mode} isDecorLinesVisible={isDecorLinesVisible} glowColor={glowColor}>
      {isDecorLinesVisible && <DecorLineStyled position="left" color={leftDecorLineColor || decorLinesColor} />}

      {isOverlayVisible && (
        <OverlayStyled mode={mode}>
          <CloseOutlined className="close-overlay" onClick={() => setIsOverlayVisible(false)} />
          {displaySlot(overlayContent)}
        </OverlayStyled>
      )}

      <BodyStyled>
        {(title || subtitle) && (
          <HeaderStyled mode={mode}>
            {title && <div className="card-title">{displaySlot(title)}</div>}
            {subtitle && <div className="card-subtitle">{displaySlot(subtitle)}</div>}
          </HeaderStyled>
        )}

        {topLeftContent && <TopLeftContentStyled>{displaySlot(topLeftContent)}</TopLeftContentStyled>}

        <ContentStyled>
          {!hideLeftContent && <div>{displaySlot(leftContent)}</div>}

          {!hideCenterContent && <div>{displaySlot(centerContent)}</div>}

          {!hideRightContent && <div>{displaySlot(rightContent)}</div>}
        </ContentStyled>

        {isInfoTooltipVisible && (
          <InfoTooltipStyled mode={mode}>
            <Tooltip
              placement="left"
              title={
                <span>
                  <span style={{ fontSize: '10px' }}>
                    <b>Game ID:</b> {gameId}
                  </span>
                  {infoTooltip && (
                    <span>
                      <br />
                      <br />
                      {displaySlot(infoTooltip)}
                    </span>
                  )}
                </span>
              }
            >
              <InfoCircleOutlined />
            </Tooltip>
          </InfoTooltipStyled>
        )}

        {footer && <FooterStyled mode={mode}>{displaySlot(footer)}</FooterStyled>}
      </BodyStyled>

      {isDecorLinesVisible && <DecorLineStyled position="right" color={rightDecorLineColor || decorLinesColor} />}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{
  mode: CardMode;
  isDecorLinesVisible: boolean;
  glowColor: CSS.Property.Color;
}>`
  --base-game-card-border-radius: 8px;

  background: var(--dark-color-6);
  border-radius: var(--base-game-card-border-radius);
  display: grid;
  min-height: 240px;
  position: relative;

  ${({ mode, glowColor }) => `
    ${
  glowColor
    ? `
      box-shadow: 0px 0px 12px 4px ${glowColor};
    `
    : ''
}

    ${
  mode === 'compact'
    ? `
      min-height: 260px;
    `
    : ''
}
  `}

  ${({ isDecorLinesVisible }) =>
    isDecorLinesVisible
      ? `
    grid-template-columns: 6px 1fr 6px;
  `
      : `
    grid-template-columns: 1fr;
  `}
`;

const OverlayStyled = styled.div<{
  mode: CardMode;
}>`
  border-radius: var(--base-game-card-border-radius);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: red;
  z-index: 10;
  background: rgba(var(--dark-color-6-rgb-string), 0.95);

  ${({ mode }) => `
    ${
  mode === 'default'
    ? `
      border-radius: calc(var(--base-game-card-border-radius) - 4px);
    `
    : ''
}
  `}

  .close-overlay {
    font-size: 14px;
    position: absolute;
    z-index: 100;
    cursor: pointer;
    right: 12px;
    top: 8px;
    transition: 0.2s all;

    &:hover {
      color: var(--white-color);
    }
  }
`;

const DecorLineStyled = styled.div<{
  position: 'left' | 'right';
  color: CSS.Property.Color;
}>`
  ${({ position, color }) => `
    background: ${color};
    border-top-${position}-radius: var(--base-game-card-border-radius);
    border-bottom-${position}-radius: var(--base-game-card-border-radius);
  `};
`;

const BodyStyled = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const HeaderStyled = styled.div<{
  mode: CardMode;
}>`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 16px;

  ${({ mode }) => `
    ${
  mode === 'compact'
    ? `
      top: 12px;
    `
    : ''
}
  `}

  .card-title {
    margin-bottom: 6px;
    font-size: 20px;
    font-weight: 600;
    color: var(--white-color);
    line-height: 1;

    ${({ mode }) => `
      ${
  mode === 'compact'
    ? `
        font-size: 12px;
      `
    : ''
}
    `}
  }

  .card-subtitle {
    user-select: none;
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    color: var(--gray-color-3);

    ${({ mode }) => `
      ${
  mode === 'compact'
    ? `
        font-size: 14px;
      `
    : ''
}
    `}
  }
`;

const TopLeftContentStyled = styled.div`
  position: absolute;
  top: 8px;
  left: 10px;
`;

const ContentStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 16px;
`;

const InfoTooltipStyled = styled.div<{
  mode: CardMode;
}>`
  position: absolute;
  top: 4px;
  right: 10px;
  font-size: 18px;
  color: var(--gray-color-3);
  cursor: help;

  ${({ mode }) => `
    ${
  mode === 'compact'
    ? `
      font-size: 16px;
    `
    : ''
}
  `}
`;

const FooterStyled = styled.div<{
  mode: CardMode;
}>`
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 10px;

  ${({ mode }) => `
    ${
  mode === 'compact'
    ? `
      bottom: 8px;
    `
    : ''
}
  `}
`;
