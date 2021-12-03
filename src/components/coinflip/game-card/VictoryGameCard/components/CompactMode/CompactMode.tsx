import { Space } from 'antd';
import { FC } from 'react';
import { BaseGameCard, CentralContent, FooterLink, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { VictoryGameCardProps } from '../../types';

const VictoryGameCard: FC<VictoryGameCardProps> = (props) => {
  const {
    MyChoiceIcon,
    myChoiceColor,
    getCardTitle,
    getCardStatus,
    getOpponentChoiceIconColor,
    getOpponentChoiceBorderColor,
    getOpponentChoiceIcon,
    amountDisplay,
    signText,
    transactionLink,
    CardStatusStyled,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
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
              <ImageArea areaSize="40px" imageWidth="24px" imageColor={myChoiceColor} borderColor={myChoiceColor}>
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
      footer={<FooterLink url={transactionLink} />}
    />
  );
};

export default VictoryGameCard;
