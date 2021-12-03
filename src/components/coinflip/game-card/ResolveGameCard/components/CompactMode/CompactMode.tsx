import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { APP_DANGER_COLOR, APP_DANGER_COLOR_RGB_STRING, APP_LIGHT_COLOR_1 } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { EyeOutlined, QuestionCircleFilled, WarningFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';
import {
  AmountDisplay,
  BaseGameCard,
  CentralContent,
  ImageArea,
  InfoBoxLabelStyled,
  InfoBoxStatStyled,
  InfoBoxStatValueStyled,
  InfoBoxStyled,
} from '../../../shared';
import { useCardShared } from '../../hooks';
import { ResolveGameCardProps } from '../../types';

const ResolveGameCard: FC<ResolveGameCardProps> = (props) => {
  const {
    cardTitle,
    cardStatus,
    signText,
    tooltipContent,
    gameInfoContents,
    footerContent,
    liquidationIndicatorContent,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
      mode="compact"
      glowColor={`rgba(${APP_DANGER_COLOR_RGB_STRING}, 0.22)`}
      hideLeftContent
      hideRightContent
      title={cardTitle}
      subtitle={cardStatus}
      topLeftContent={
        <ImageArea areaSize="20px" imageWidth="12px" imageColor={APP_DANGER_COLOR} borderColor={APP_DANGER_COLOR}>
          <WarningFilled />
        </ImageArea>
      }
      centerContent={({ showOverlay }) => (
        <CentralContent signTextUppercase signText={signText}>
          <Space direction="vertical" align="center">
            <AmountDisplay amount={100} symbol="LUNA" logo={<LunaLogo />} />

            <UiButton uppercase type="primary" size="small" shape="round">
              Resolve game
            </UiButton>

            <UiButton
              uppercase
              type="text"
              size="small"
              shape="round"
              style={{ color: APP_LIGHT_COLOR_1 }}
              icon={<EyeOutlined />}
              onClick={showOverlay}
            >
              View info
            </UiButton>
          </Space>
        </CentralContent>
      )}
      overlayContent={
        <OverlayContentStyled>
          <InfoBoxStyled>
            {gameInfoContents.map((item, index) => (
              <InfoBoxStatStyled key={`info-item__${index}`}>
                <InfoBoxLabelStyled className={item.tooltip ? 'cursor-help' : ''}>
                  <Tooltip title={item.tooltip}>
                    {item.label}
                    {item.tooltip ? (
                      <span className="text-color-gray-2" style={{ fontSize: '8px' }}>
                        &nbsp;
                        <QuestionCircleFilled />
                      </span>
                    ) : (
                      ':'
                    )}
                  </Tooltip>
                </InfoBoxLabelStyled>
                <InfoBoxStatValueStyled>{item.value}</InfoBoxStatValueStyled>
              </InfoBoxStatStyled>
            ))}

            {liquidationIndicatorContent}
          </InfoBoxStyled>
        </OverlayContentStyled>
      }
      infoTooltip={tooltipContent}
      footer={footerContent}
    />
  );
};

const OverlayContentStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ResolveGameCard;
