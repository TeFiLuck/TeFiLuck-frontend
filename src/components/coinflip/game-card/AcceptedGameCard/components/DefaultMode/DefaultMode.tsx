import { UiButton } from '@/components/ui';
import { QuestionCircleFilled } from '@ant-design/icons';
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
import { AcceptedGameCardProps } from '../../types';

const AcceptedGameCard: FC<AcceptedGameCardProps> = (props) => {
  const { game } = props;

  const {
    cardTitle,
    cardStatus,
    canLiquidate,
    chosenSideColor,
    ChosenSideIcon,
    signText,
    tooltipContent,
    gameInfoContents,
    footerLink,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={game.id}
      leftDecorLineColor={chosenSideColor}
      rightDecorLineColor="transparent"
      hideLeftContent
      title={cardTitle}
      subtitle={cardStatus}
      topLeftContent={
        <ImageArea areaSize="30px" imageWidth="18px" imageColor={chosenSideColor} borderColor={chosenSideColor}>
          <ChosenSideIcon />
        </ImageArea>
      }
      centerContent={
        <CentralContent signTextUppercase signText={signText}>
          <Space direction="vertical">
            <AmountDisplay tokenSymbol={game.asset.denom} uAmount={game.asset.amount} />

            <UiButton uppercase type="primary" size="small" shape="round" disabled={!canLiquidate}>
              Liquidate
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
        </InfoBoxStyled>
      }
      infoTooltip={tooltipContent}
      footer={footerLink}
    />
  );
};

export default AcceptedGameCard;
