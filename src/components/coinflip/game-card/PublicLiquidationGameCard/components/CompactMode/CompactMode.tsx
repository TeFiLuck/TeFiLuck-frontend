import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { APP_SUCCESS_COLOR_RGB_STRING } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { Space } from 'antd';
import { FC } from 'react';
import { AmountDisplay, BaseGameCard, CentralContent, FooterLink } from '../../../shared';
import { useCardShared } from '../../hooks';
import { PublicLiquidationGameCardProps } from '../../types';

const PublicLiquidationGameCard: FC<PublicLiquidationGameCardProps> = (props) => {
  const { cardTitle, cardStatus, signText, tooltipContent, transactionLink } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
      mode="compact"
      glowColor={`rgba(${APP_SUCCESS_COLOR_RGB_STRING}, 0.22)`}
      title={cardTitle}
      subtitle={cardStatus}
      hideLeftContent
      hideRightContent
      centerContent={
        <CentralContent signTextUppercase signText={signText}>
          <Space direction="vertical">
            <AmountDisplay amount={0.0007} ticker="LUNA" logo={<LunaLogo />} />

            <UiButton uppercase type="primary" size="small" shape="round">
              Liquidate
            </UiButton>
          </Space>
        </CentralContent>
      }
      infoTooltip={tooltipContent}
      footer={<FooterLink url={transactionLink} />}
    />
  );
};

export default PublicLiquidationGameCard;
