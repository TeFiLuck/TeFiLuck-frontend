import { TerraAPI } from '@/api/terra';
import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { ENCRYPTION_PASSWORD_SEPARATOR } from '@/constants/coinflip';
import { DEFAULT_FEES_TOKEN_SYMBOL } from '@/constants/finance-management';
import { useConnectedWallet, useIsMounted, useNetwork } from '@/hooks';
import { useGames } from '@/hooks/coinflip';
import { PortalLocation, sha256, teleportTo } from '@/utils/common';
import { CheckOutlined, FileTextOutlined } from '@ant-design/icons';
import { UserDenied } from '@terra-money/wallet-provider';
import { Input, Space, Upload } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalView, ModalViewsProps } from '../../common';

const ResolveGame: FC<ModalViewsProps<Record<any, any>>> = ({ game, setIsModalClosable, changeView }) => {
  useIsMounted();
  const { network } = useNetwork();
  const { connectedWallet } = useConnectedWallet();
  const { findSavedPassword } = useGames();
  const [resolvePassword, setResolvePassword] = useState('');
  const [isTransactionAttemptStarted, setIsTransactionAttemptStarted] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const isError = !!errorMessage;

  const savedPassword = findSavedPassword(game.id) || '';
  const isSavedPasswordExists = !!savedPassword;

  useEffect(() => {
    if (isSavedPasswordExists) setResolvePassword(savedPassword);
  }, [savedPassword]);

  function handleResolvePasswordChange(event: any): void {
    if (!isSavedPasswordExists) setResolvePassword(event.target.value);
  }

  function handleResolvePasswordFileUpload({ file }: any): void {
    const reader = new FileReader();

    reader.onload = function () {
      const fileContents = String(reader.result || '');
      setResolvePassword(fileContents);
      validatePassword(fileContents);
    };

    reader.readAsText(file);
  }

  async function validatePassword(password: string): Promise<boolean> {
    const encryptedPassword = await sha256(password);

    if (encryptedPassword !== game.signature) {
      setErrorMessage('Incorrect password provided');
      return false;
    }

    setErrorMessage('');
    return true;
  }

  async function handleGameResolve(): Promise<void> {
    const isValid = await validatePassword(resolvePassword);
    if (isValid) {
      resolveGame();
    }
  }

  async function resolveGame(): Promise<void> {
    if (connectedWallet) {
      try {
        setIsModalClosable(false);
        setIsTransactionAttemptStarted(true);

        const { success, result } = await TerraAPI.coinflip.resolveGame({
          wallet: connectedWallet,
          feeTokenSymbol: DEFAULT_FEES_TOKEN_SYMBOL,
          sendTokens: [],
          maxGas: network.fee.intermediateGas,
          payload: {
            gameId: game.id,
            encryptionPassword: resolvePassword,
          },
        });

        if (success) {
          changeView(ModalView.TransactionProcessing, {
            txHash: result.txhash,
          });
        } else {
          changeView(ModalView.TransactionFailed);
        }
      } catch (err: unknown) {
        if (!(err instanceof UserDenied)) {
          changeView(ModalView.TransactionFailed, {
            reason: TerraAPI.utils.getMessageFromPostTransactionError(err),
          });
        }
      } finally {
        setIsModalClosable(true);
        setIsTransactionAttemptStarted(false);
      }
    }
  }

  return (
    <>
      <Portal node={teleportTo(PortalLocation.ResolveGameModalContent)}>
        <ContentStyled>
          <Space size={16} direction="vertical" className="full-width">
            <div style={{ height: '200px' }}>
              <Upload.Dragger
                accept=".txt"
                beforeUpload={() => false}
                disabled={isSavedPasswordExists}
                showUploadList={false}
                onChange={handleResolvePasswordFileUpload}
              >
                {!isSavedPasswordExists && (
                  <Space direction="vertical">
                    <div>
                      <FileTextOutlined style={{ fontSize: '48px' }} />
                    </div>
                    <div>
                      Select or drag <b>.txt file</b> with your password
                    </div>
                  </Space>
                )}

                {isSavedPasswordExists && (
                  <Space direction="vertical">
                    <div className="text-color-success">
                      <CheckOutlined style={{ fontSize: '48px' }} />
                    </div>
                    Your password has been saved locally
                  </Space>
                )}
              </Upload.Dragger>
            </div>

            {!isSavedPasswordExists && <div className="align-center">OR input the password manually</div>}

            <div>
              <Input.Password
                value={resolvePassword}
                placeholder={`SIDE${ENCRYPTION_PASSWORD_SEPARATOR}ENCRYPTION-PASSWORD`}
                size="large"
                style={{ borderColor: isError ? APP_DANGER_COLOR : 'var(--dark-color-3)' }}
                onChange={handleResolvePasswordChange}
                onPressEnter={handleGameResolve}
              />
            </div>

            {isError && <div className="align-center text-color-danger">{errorMessage}</div>}
          </Space>
        </ContentStyled>
      </Portal>

      <Portal node={teleportTo(PortalLocation.ResolveGameModalFooter)}>
        <UiButton
          loading={isTransactionAttemptStarted}
          type="primary"
          theme="alternative"
          shape="round"
          onClick={handleGameResolve}
        >
          Resolve game
        </UiButton>
      </Portal>
    </>
  );
};

const ContentStyled = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`;

export default ResolveGame;
