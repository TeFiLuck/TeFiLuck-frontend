import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { useGames } from '@/hooks/coinflip';
import { OngoingGame } from '@/typings/coinflip';
import { QuestionCircleFilled, WarningFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { FC } from 'react';
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
      decorLinesColor={APP_DANGER_COLOR}
      hideLeftContent
      title={cardTitle}
      subtitle={cardStatus}
      topLeftContent={
        <ImageArea areaSize="30px" imageWidth="16px" imageColor={APP_DANGER_COLOR} borderColor={APP_DANGER_COLOR}>
          <WarningFilled />
        </ImageArea>
      }
      centerContent={
        <CentralContent signTextUppercase signText={signText}>
          <Space direction="vertical">
            <AmountDisplay tokenSymbol={game.asset.denom} uAmount={game.asset.amount} />

            <UiButton uppercase type="primary" size="small" shape="round" onClick={() => resolveGame(game)}>
              Resolve game
            </UiButton>
          </Space>
        </CentralContent>
      }
      rightContent={
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
      }
      infoTooltip={tooltipContent}
      footer={footerContent}
    />
  );
};

export default ResolveGameCard;
