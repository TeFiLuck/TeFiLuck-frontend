import { TerraAPI, Transaction } from '@/api/terra';
import { ResolveGameResponse } from '@/api/terra/coinflip';
import { ReactComponent as SadImage } from '@/assets/images/sad.svg';
import { ReactComponent as SmileImage } from '@/assets/images/smile.svg';
import { APP_DANGER_COLOR, APP_SUCCESS_COLOR } from '@/assets/styles/design';
import { UiTxHashDisplay } from '@/components/ui';
import { GUARANTEED_RESOLVED_GAME_PROFIT_PERCENTAGE } from '@/constants/coinflip';
import { useAddress, useTokens } from '@/hooks';
import { PortalLocation, teleportTo } from '@/utils/common';
import { round } from '@/utils/format';
import { Space } from 'antd';
import { FC } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalViewsProps } from '../../common';

type SuccessTransactionData = {
  transaction: Transaction;
};

const TransactionSuccess: FC<ModalViewsProps<SuccessTransactionData>> = ({ data, game }) => {
  const { transaction } = data;
  const userAddress = useAddress();
  const { findToken } = useTokens();
  const txResponse = TerraAPI.utils.getResponseFromTransaction<ResolveGameResponse>(transaction);

  const isVictory = txResponse.winner === userAddress;

  const ResultImage = isVictory ? SmileImage : SadImage;
  const resultColor = isVictory ? APP_SUCCESS_COLOR : APP_DANGER_COLOR;

  const gameTokenTicker = findToken(game.asset.denom).ticker;

  const affectedAmount = ((): string => {
    if (isVictory) {
      const wonAmount = round(
        (TerraAPI.utils.fromUAmount(game.asset.amount, game.asset.denom) / 100) *
          GUARANTEED_RESOLVED_GAME_PROFIT_PERCENTAGE,
        6,
      );
      return `+${wonAmount}`;
    }

    const lostAmount = round(TerraAPI.utils.fromUAmount(game.asset.amount, game.asset.denom) / 2, 6);
    return `-${lostAmount}`;
  })();

  return (
    <>
      <Portal node={teleportTo(PortalLocation.ResolveGameModalContent)}>
        <ContentStyled>
          <Space direction="vertical" align="center" size={12}>
            <div>
              <ResultImage fill={resultColor} style={{ width: 'auto', height: '120px' }} />
            </div>

            <div className="heading-2" style={{ color: resultColor }}>
              {isVictory ? 'YOU WON' : 'YOU LOST'}
            </div>

            <AmountDisplayStyled>
              {affectedAmount} {gameTokenTicker}
            </AmountDisplayStyled>

            <UiTxHashDisplay txHash={transaction.txhash} />
          </Space>
        </ContentStyled>
      </Portal>
    </>
  );
};

const ContentStyled = styled.div`
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 32px;
`;

const AmountDisplayStyled = styled.div`
  font-weight: 700;
  color: var(--white-color);
  background: var(--dark-color-5);
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 14px;
  min-width: 120px;
  text-align: center;
`;

export default TransactionSuccess;
