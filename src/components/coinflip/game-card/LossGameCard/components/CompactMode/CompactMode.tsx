import { Space } from 'antd';
import { FC } from 'react';
import { BaseGameCard, CentralContent, FooterLink, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { LossGameCardProps } from '../../types';

const LossGameCard: FC<LossGameCardProps> = (props) => {
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
    transactionLink,
    CardStatusStyled,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
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
      footer={<FooterLink url={transactionLink} />}
    />
  );
};

export default LossGameCard;
