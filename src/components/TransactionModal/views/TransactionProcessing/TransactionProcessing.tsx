import { TerraAPI } from '@/api/terra';
import { UiTxHashDisplay } from '@/components/ui';
import { useNetwork } from '@/hooks';
import { PortalLocation, teleportTo } from '@/utils/common';
import { UserDenied } from '@terra-money/wallet-provider';
import { Alert, Space, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalView, ModalViewsProps } from '../../common';

const TransactionProcessing: FC<ModalViewsProps<Record<any, any>>> = ({
  transactionConfig,
  changeView,
  closeModal,
  setIsModalClosable,
}) => {
  const { networkKey } = useNetwork();
  const [txHash, setTxHash] = useState('');
  const isTxTracking = !!txHash;

  useEffect(() => {
    setIsModalClosable(false);
    startTransactionExecution();

    return () => {
      setIsModalClosable(true);
    };
  }, []);

  async function startTransactionExecution(): Promise<void> {
    try {
      const { success, result } = await transactionConfig.executionAction;

      if (success) {
        setTxHash(result.txhash);
        trackTransaction(result.txhash);
      } else {
        changeView(ModalView.TransactionFailed);
      }
    } catch (err: unknown) {
      if (err instanceof UserDenied) {
        closeModal();
      } else {
        changeView(ModalView.TransactionFailed, {
          reason: TerraAPI.utils.getMessageFromPostTransactionError(err),
        });
      }
    }
  }

  function trackTransaction(transactionHash: string): void {
    TerraAPI.core.trackTransaction({
      networkKey,
      txHash: transactionHash,
      onSuccess: ({ transaction }) => {
        changeView(ModalView.TransactionSuccess, { transaction });
      },
      onError: (response) => {
        const failedPayload: Record<string, any> = {
          reason: response.reason,
        };

        if (!response.isExecuted) {
          failedPayload.txHash = response.txHash;
        }

        changeView(ModalView.TransactionFailed, failedPayload);
      },
    });
  }

  return (
    <>
      <Portal node={teleportTo(PortalLocation.TransactionModalContent)}>
        <ContentStyled>
          <Space direction="vertical" size={24}>
            <LoadingStyled />

            <Space direction="vertical" size={12}>
              {isTxTracking ? (
                <>
                  <div className="heading-4 text-color-white">Processing transaction</div>
                  <UiTxHashDisplay txHash={txHash} />
                </>
              ) : (
                <>
                  <div className="heading-4 text-color-white" style={{ lineHeight: '1.3' }}>
                    Transaction constructed <br />
                    Confirm or deny it via wallet
                  </div>
                  <Alert
                    type="warning"
                    message={
                      <b className="text-color-warning">
                        {'You can\'t close this window until you DENY or FINISH transaction'}
                      </b>
                    }
                  />
                  <div>If you accept the transaction, it will start executing after a little delay.</div>
                </>
              )}
            </Space>
          </Space>
        </ContentStyled>
      </Portal>
    </>
  );
};

const ContentStyled = styled.div`
  height: 100%;
  max-width: 320px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  padding-bottom: 60px;
`;

const LoadingStyled = styled(Spin)`
  .ant-spin-dot {
    font-size: 54px;
  }

  .ant-spin-dot-item {
    width: 24px;
    height: 24px;
  }
`;

export default TransactionProcessing;
