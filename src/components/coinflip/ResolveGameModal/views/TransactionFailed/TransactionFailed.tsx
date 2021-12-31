import { ReactComponent as FailImage } from '@/assets/images/fail.svg';
import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { UiTxHashDisplay } from '@/components/ui';
import { PortalLocation, teleportTo } from '@/utils/common';
import { Space } from 'antd';
import { FC } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalViewsProps } from '../../common';

type FailedTransactionData = {
  reason?: string;
  txHash?: string;
};

const TransationFailed: FC<ModalViewsProps<FailedTransactionData>> = ({ data }) => {
  const isTxNotExecutedYet = !!data.txHash;
  const isTxExecuted = !data.txHash;

  return (
    <>
      <Portal node={teleportTo(PortalLocation.ResolveGameModalContent)}>
        <ContentStyled>
          <Space direction="vertical" align="center" size={12}>
            {isTxExecuted && (
              <div>
                <FailImage fill={APP_DANGER_COLOR} style={{ width: 'auto', height: '120px' }} />
              </div>
            )}

            <div>
              <span className="heading-3 text-color-white">
                {isTxExecuted ? 'Transaction failed' : 'Timeout error'}
              </span>
            </div>

            {data.reason && <div style={{ maxWidth: '320px' }}>{data.reason}</div>}

            {isTxNotExecutedYet && (
              <div className="text-color-danger" style={{ maxWidth: '320px' }}>
                Transaction might still succeed. You can check out the final state following transaction hash link.
              </div>
            )}

            {isTxNotExecutedYet && <UiTxHashDisplay txHash={data?.txHash} />}
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

export default TransationFailed;
