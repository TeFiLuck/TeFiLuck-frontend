import { TerraAPI, Transaction } from '@/api/terra';
import { CreateGameResponse } from '@/api/terra/coinflip';
import { ReactComponent as SuccessImage } from '@/assets/images/success.svg';
import { APP_SUCCESS_COLOR } from '@/assets/styles/design';
import { UiCopy, UiTxHashDisplay } from '@/components/ui';
import { useAppDispatch } from '@/state';
import { savePassword } from '@/state/coinflip';
import { downloadFile, PortalLocation, teleportTo } from '@/utils/common';
import { Input, Space } from 'antd';
import { FC, useEffect } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalViewsProps } from '../../common';

type SuccessTransactionData = {
  transaction: Transaction;
  password: string;
  shouldSavePassword: boolean;
};

const TransactionSuccess: FC<ModalViewsProps<SuccessTransactionData>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { transaction, password, shouldSavePassword } = data;
  const txResponse = TerraAPI.utils.getResponseFromTransaction<CreateGameResponse>(transaction);

  useEffect(() => {
    downloadFile(`TeFiLuck-gameID-${txResponse.bet_id}.txt`, password);

    if (shouldSavePassword) {
      dispatch(
        savePassword({
          gameId: txResponse.bet_id,
          address: txResponse.sender,
          password,
        }),
      );
    }
  }, []);

  return (
    <>
      <Portal node={teleportTo(PortalLocation.CreateGameModalContent)}>
        <ContentStyled>
          <Space direction="vertical" align="center" size={12}>
            <div>
              <SuccessImage fill={APP_SUCCESS_COLOR} style={{ width: 'auto', height: '120px' }} />
            </div>

            <div className="heading-4 text-color-white">Game successfully created</div>

            <Space direction="vertical" align="start">
              <Space>
                <Input.Password style={{ width: '150px' }} value={txResponse.bet_id} />
                <UiCopy target={txResponse.bet_id} copyButtonContent="Game ID" />
              </Space>

              <Space>
                <Input.Password style={{ width: '150px' }} value={password} />
                <UiCopy target={password} copyButtonContent="Password" />
              </Space>
            </Space>

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
