import { Space } from 'antd';
import { FC } from 'react';
import { BaseGameCard, CentralContent, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { VictoryGameCardProps } from '../../types';

const VictoryGameCard: FC<VictoryGameCardProps> = (props) => {
  const { game } = props;

  const {
    MyChoiceIcon,
    myChoiceIconColor,
    myChoiceBorderColor,
    getCardTitle,
    getCardStatus,
    getOpponentChoiceIconColor,
    getOpponentChoiceBorderColor,
    getOpponentChoiceIcon,
    amountDisplay,
    signText,
    footerLink,
    CardStatusStyled,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={game.id}
      mode="compact"
      title={getCardTitle()}
      subtitle={<CardStatusStyled>{getCardStatus()}</CardStatusStyled>}
      hideLeftContent
      hideRightContent
      centerContent={
        <CentralContent signText={signText}>
          <Space direction="vertical">
            {amountDisplay}
            <Space>
              <ImageArea
                areaSize="40px"
                imageWidth="24px"
                imageColor={myChoiceIconColor}
                borderColor={myChoiceBorderColor}
              >
                <MyChoiceIcon />
              </ImageArea>

              <ImageArea
                areaSize="40px"
                imageWidth="24px"
                imageColor={getOpponentChoiceIconColor()}
                borderColor={getOpponentChoiceBorderColor()}
              >
                {getOpponentChoiceIcon()}
              </ImageArea>
            </Space>
          </Space>
        </CentralContent>
      }
      footer={footerLink}
    />
  );
};

export default VictoryGameCard;
