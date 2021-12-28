import { Space } from 'antd';
import { FC } from 'react';
import { BaseGameCard, CentralContent, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { LossGameCardProps } from '../../types';

const LossGameCard: FC<LossGameCardProps> = (props) => {
  const { game } = props;

  const {
    OpponentChoiceIcon,
    opponentChoiceColor,
    cardTitle,
    getCardStatus,
    getCardSignText,
    getMyChoiceIcon,
    getMyChoiceIconColor,
    getMyChoiceBorderColor,
    amountDisplay,
    footerLink,
    CardStatusStyled,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={game.id}
      mode="compact"
      title={cardTitle}
      subtitle={<CardStatusStyled>{getCardStatus()}</CardStatusStyled>}
      hideLeftContent
      hideRightContent
      centerContent={
        <CentralContent signText={getCardSignText()}>
          <Space direction="vertical">
            {amountDisplay}
            <Space>
              <ImageArea
                areaSize="40px"
                imageWidth="24px"
                imageColor={getMyChoiceIconColor()}
                borderColor={getMyChoiceBorderColor()}
              >
                {getMyChoiceIcon()}
              </ImageArea>

              <ImageArea
                areaSize="40px"
                imageWidth="24px"
                imageColor={opponentChoiceColor}
                borderColor={opponentChoiceColor}
              >
                <OpponentChoiceIcon />
              </ImageArea>
            </Space>
          </Space>
        </CentralContent>
      }
      footer={footerLink}
    />
  );
};

export default LossGameCard;
