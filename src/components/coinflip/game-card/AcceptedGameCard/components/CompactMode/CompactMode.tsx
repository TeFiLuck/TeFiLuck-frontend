import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { APP_LIGHT_COLOR_1 } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { EyeOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';
import {
  AmountDisplay,
  BaseGameCard,
  CentralContent,
  FooterLink,
  ImageArea,
  InfoBoxLabelStyled,
  InfoBoxStatStyled,
  InfoBoxStatValueStyled,
  InfoBoxStyled,
} from '../../../shared';
import { useCardShared } from '../../hooks';
import { AcceptedGameCardProps } from '../../types';

const AcceptedGameCard: FC<AcceptedGameCardProps> = (props) => {
  const {
    cardTitle,
    cardStatus,
    canLiquidate,
    chosenSideColor,
    ChosenSideIcon,
    signText,
    tooltipContent,
    gameInfoContents,
    transactionLink,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
      mode="compact"
      hideLeftContent
      hideRightContent
      title={cardTitle}
      subtitle={cardStatus}
      topLeftContent={
        <ImageArea areaSize="20px" imageWidth="12px" imageColor={chosenSideColor} borderColor={chosenSideColor}>
          <ChosenSideIcon />
        </ImageArea>
      }
      centerContent={({ showOverlay }) => (
        <CentralContent signTextUppercase signText={signText}>
          <Space direction="vertical">
            <AmountDisplay amount={100} symbol="LUNA" logo={<LunaLogo />} />

            <UiButton uppercase type="primary" size="small" shape="round" disabled={!canLiquidate}>
              Liquidate
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
          </InfoBoxStyled>
        </OverlayContentStyled>
      }
      infoTooltip={tooltipContent}
      footer={<FooterLink url={transactionLink} />}
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

export default AcceptedGameCard;
