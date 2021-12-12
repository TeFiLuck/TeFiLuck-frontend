import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { UiButton } from '@/components/ui';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { FC } from 'react';
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
            <AmountDisplay amount={100} ticker="LUNA" logo={<LunaLogo />} />

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
      footer={<FooterLink url={transactionLink} />}
    />
  );
};

export default AcceptedGameCard;
