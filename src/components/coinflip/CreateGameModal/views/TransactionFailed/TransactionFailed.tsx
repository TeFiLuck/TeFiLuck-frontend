import { ReactComponent as FailImage } from '@/assets/images/fail.svg';
import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { UiButton, UiCopy, UiTxHashDisplay } from '@/components/ui';
import { PortalLocation, teleportTo } from '@/utils/common';
import { Input, Space } from 'antd';
import { FC } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalView, ModalViewsProps } from '../../common';

type FailedTransactionData = {
  reason?: string;
  txHash?: string;
  password?: string;
};

const TransactionFailed: FC<ModalViewsProps<FailedTransactionData>> = ({ changeView, data }) => {
  const isTxNotExecutedYet = data.password && data.txHash;
  const isTxExecuted = !isTxNotExecutedYet;
  const choiceEncryptionPassword = data.password || '';

  function redirectToCreateGameView(): void {
    changeView(ModalView.CreateGame);
  }

  return (
    <>
      <Portal node={teleportTo(PortalLocation.CreateGameModalHeader)}>
        <span>Create game</span>
      </Portal>

      <Portal node={teleportTo(PortalLocation.CreateGameModalContent)}>
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
              <SavePasswordContainerStyled>
                <Space direction="vertical">
                  <div className="text-color-danger">
                    Because transaction might still succeed, please save the password or you might not be able to
                    resolve the game:
                  </div>

                  <Space>
                    <Input.Password value={data.password} />
                    <UiCopy target={choiceEncryptionPassword} />
                  </Space>
                </Space>
              </SavePasswordContainerStyled>
            )}

            {isTxNotExecutedYet && <UiTxHashDisplay txHash={data?.txHash} />}

            {isTxExecuted && (
              <div>
                <UiButton type="primary" shape="round" uppercase theme="alternative" onClick={redirectToCreateGameView}>
                  Try again
                </UiButton>
              </div>
            )}
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
`;

const SavePasswordContainerStyled = styled.div`
  border: 3px solid var(--global-danger-color);
  padding: 12px 0;
  background: rgba(255, 0, 0, 0.05);
  border-radius: 8px;
`;

export default TransactionFailed;
