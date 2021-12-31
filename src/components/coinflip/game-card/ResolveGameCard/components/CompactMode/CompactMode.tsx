import { APP_DANGER_COLOR, APP_DANGER_COLOR_RGB_STRING, APP_LIGHT_COLOR_1 } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { useGames } from '@/hooks/coinflip';
import { OngoingGame } from '@/typings/coinflip';
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
  const game = props.game as OngoingGame;
  const { resolveGame } = useGames();

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
      gameId={game.id}
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
            <AmountDisplay tokenSymbol={game.asset.denom} uAmount={game.asset.amount} />

            <UiButton uppercase type="primary" size="small" shape="round" onClick={() => resolveGame(game)}>
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
