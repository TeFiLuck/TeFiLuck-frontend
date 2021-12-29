import { TerraAPI } from '@/api/terra';
import { UiTxHashDisplay } from '@/components/ui';
import { useNetwork } from '@/hooks';
import { PortalLocation, teleportTo } from '@/utils/common';
import { Space, Spin } from 'antd';
import { FC, useEffect } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalView, ModalViewsProps } from '../../common';

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

  function trackTransactionResult(): void {
    TerraAPI.core.trackTransaction({
      networkKey,
      txHash,
      onSuccess: ({ transaction }) => {
        changeView(ModalView.TransactionSuccess, {
          transaction,
          password,
          shouldSavePassword,
        });
      },
      onError: (response) => {
        const failedPayload: Record<string, any> = {
          reason: response.reason,
        };

        if (!response.isExecuted) {
          failedPayload.txHash = response.txHash;
          failedPayload.password = password;
        }

        changeView(ModalView.TransactionFailed, failedPayload);
      },
    });
  }

  return (
    <>
      <Portal node={teleportTo(PortalLocation.CreateGameModalContent)}>
        <ContentStyled>
          <Space direction="vertical" size={24}>
            <LoadingStyled />
            <Space direction="vertical" size={12} style={{ marginBottom: '32px' }}>
              <div className="heading-4 text-color-white">Processing transaction</div>
              <UiTxHashDisplay txHash={txHash} />
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
