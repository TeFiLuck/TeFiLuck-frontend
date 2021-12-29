import { Transaction } from '@/api/terra';
import { ReactComponent as SuccessImage } from '@/assets/images/success.svg';
import { APP_SUCCESS_COLOR } from '@/assets/styles/design';
import { UiTxHashDisplay } from '@/components/ui';
import { PortalLocation, teleportTo } from '@/utils/common';
import { Space } from 'antd';
import { FC } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalViewsProps } from '../../common';

type SuccessTransactionData = {
  transaction: Transaction;
};

const TransactionSuccess: FC<ModalViewsProps<SuccessTransactionData>> = ({ data }) => {
  const { transaction } = data;

  return (
    <>
      <Portal node={teleportTo(PortalLocation.TransactionModalContent)}>
        <ContentStyled>
          <Space direction="vertical" align="center" size={12}>
            <div>
              <SuccessImage fill={APP_SUCCESS_COLOR} style={{ width: 'auto', height: '120px' }} />
            </div>

            <div className="heading-4 text-color-white">TRANSACTION SUCCEEDED</div>

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

export default TransactionSuccess;
