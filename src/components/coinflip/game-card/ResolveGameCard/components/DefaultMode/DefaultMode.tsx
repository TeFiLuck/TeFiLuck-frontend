import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
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
            <AmountDisplay amount={100} ticker="LUNA" logo={<LunaLogo />} />

            <UiButton uppercase type="primary" size="small" shape="round">
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
