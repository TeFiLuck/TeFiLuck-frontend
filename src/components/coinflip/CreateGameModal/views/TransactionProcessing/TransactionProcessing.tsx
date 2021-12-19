import { TerraAPI } from '@/api/terra';
import { MAX_TX_POLLING_RETRIES, TX_POLLING_INTERVAL_MS } from '@/constants/networks';
import { useNetwork } from '@/hooks';
import { PortalLocation, teleportTo } from '@/utils/common';
import { Space, Spin } from 'antd';
import { FC, useEffect } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalView, ModalViewsProps } from '../../common';
import TxHashDisplay from '../../components/TxHashDisplay/TxHashDisplay';

type ProcessingTransactionData = {
  txHash: string;
  password: string;
  shouldSavePassword: boolean;
};

const TransactionProcessing: FC<ModalViewsProps<ProcessingTransactionData>> = ({
  changeView,
  data,
  setIsModalClosable,
}) => {
  const { networkKey } = useNetwork();
  const { password, shouldSavePassword, txHash } = data;

  useEffect(() => {
    setIsModalClosable(false);
    trackTransactionResult();

    return () => {
      setIsModalClosable(true);
    };
  }, []);

  function trackTransactionResult() {
    let retries = 0;

    const loadTransaction = async () => {
      try {
        const transaction = await TerraAPI.core.fetchTransaction({ txHash, networkKey });

        if (transaction.code) {
          changeView(ModalView.TransactionFailed, { reason: transaction.raw_log });
        } else {
          changeView(ModalView.TransactionSuccess, {
            transaction,
            password,
            shouldSavePassword,
          });
        }
      } catch (err) {
        if (retries < MAX_TX_POLLING_RETRIES) {
          setTimeout(loadTransaction, TX_POLLING_INTERVAL_MS);
          retries += 1;
        } else {
          changeView(ModalView.TransactionFailed, {
            reason:
              'The execution of this transaction is taking a little longer than usual. It has been successfully broadcasted, but have not been executed yet.',
            txHash,
            password,
          });
        }
      }
    };

    loadTransaction();
  }

  return (
    <>
      <Portal node={teleportTo(PortalLocation.CreateGameModalContent)}>
        <ContentStyled>
          <Space direction="vertical" size={24}>
            <LoadingStyled />
            <Space direction="vertical" size={12} style={{ marginBottom: '32px' }}>
              <div className="heading-4 text-color-white">Processing transaction</div>
              <TxHashDisplay txHash={txHash} />
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
