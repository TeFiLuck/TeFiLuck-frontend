import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { UiButton } from '@/components/ui';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideIcon } from '@/utils/coinflip';
import { Space } from 'antd';
import { FC } from 'react';
import { AmountDisplay, BaseGameCard, CentralContent, FooterLink } from '../../../shared';
import { useCardShared } from '../../hooks';
import { PendingGameCardProps } from '../../types';

const PendingGameCard: FC<PendingGameCardProps> = (props) => {
  const { isCurrentUserCreatorOfGame } = props;

  const { getCardTitle, cardStatus, getTooltipContent, signText, transactionLink } = useCardShared(props);

  const HeadsIcon = getCoinSideIcon(CoinSide.Heads);
  const TailsIcon = getCoinSideIcon(CoinSide.Tails);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
      mode="compact"
      title={getCardTitle()}
      subtitle={cardStatus}
      centerContent={
        <CentralContent signTextUppercase signText={signText}>
          <Space direction="vertical" align="center">
            <AmountDisplay amount={777} symbol="LUNA" logo={<LunaLogo />} />

            {isCurrentUserCreatorOfGame && (
              <UiButton uppercase type="primary" size="small" shape="round">
                Cancel game
              </UiButton>
            )}

            {!isCurrentUserCreatorOfGame && (
              <Space direction="vertical" size={6}>
                <UiButton
                  uppercase
                  type="primary"
                  theme="coin-heads"
                  size="small"
                  shape="round"
                  style={{ width: '100%' }}
                >
                  <Space size={6}>
                    Play bulls
                    <div className="flex flex-align-center">
                      <HeadsIcon style={{ fill: '#ffffff', width: '16px' }} />
                    </div>
                  </Space>
                </UiButton>

                <UiButton
                  uppercase
                  type="primary"
                  theme="coin-tails"
                  size="small"
                  shape="round"
                  style={{ width: '100%' }}
                >
                  <Space size={6}>
                    Play bears
                    <div className="flex flex-align-center">
                      <TailsIcon style={{ fill: '#ffffff', width: '16px' }} />
                    </div>
                  </Space>
                </UiButton>
              </Space>
            )}
          </Space>
        </CentralContent>
      }
      infoTooltip={getTooltipContent()}
      footer={<FooterLink url={transactionLink} />}
    />
  );
};

export default PendingGameCard;
