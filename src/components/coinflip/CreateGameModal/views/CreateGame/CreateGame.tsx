import { TerraAPI } from '@/api/terra';
import CoinSideChoice from '@/components/coinflip/CoinSideChoice/CoinSideChoice';
import { UiButton, UiTokenAmountInput, UiTokensSelect } from '@/components/ui';
import {
  CoinSide,
  DEFAULT_AMOUNT_BLOCKS_BEFORE_LIQUIDABLE,
  DEFAULT_SELECTED_SIDE,
  ENCRYPTION_PASSWORD_MIN_LENGTH,
  ENCRYPTION_PASSWORD_SEPARATOR,
  MIN_BLOCKS_BEFORE_LIQUIDABLE,
} from '@/constants/coinflip';
import { DEFAULT_FEES_TOKEN_SYMBOL } from '@/constants/finance-management';
import { TokenSymbol } from '@/constants/tokens';
import { useConnectedWallet, useMediaQueries, useTokens } from '@/hooks';
import { Token } from '@/typings/finance-management';
import { encryptChosenSide, getMinRequiredAmountToCreateGame } from '@/utils/coinflip';
import { PortalLocation, teleportTo } from '@/utils/common';
import { getHoursFromTerraBlocksAmount } from '@/utils/networks';
import { UserDenied } from '@terra-money/wallet-provider';
import { Alert, Space } from 'antd';
import { FC, useState } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalView, ModalViewsProps } from '../../common';
import GameFlowAlert from './components/GameFlowAlert/GameFlowAlert';
import PasswordField from './components/PasswordField/PasswordField';
import ResolveTimeField from './components/ResolveTimeField/ResolveTimeField';
import SavePasswordCheckbox from './components/SavePasswordCheckbox/SavePasswordCheckbox';

const CreateGame: FC<ModalViewsProps<Record<any, any>>> = ({ changeView, setIsModalClosable }) => {
  const { is414PxOrLess } = useMediaQueries();
  const { mainToken, supportedTokens } = useTokens();
  const { isWalletConnected, connectedWallet } = useConnectedWallet();
  const [isTransactionAttemptStarted, setIsTransactionAttemptStarted] = useState(false);

  const [chosenSide, setChosenSide] = useState<CoinSide>(DEFAULT_SELECTED_SIDE);

  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<TokenSymbol>(mainToken.symbol);
  const selectedToken = supportedTokens.find((token) => token.symbol === selectedTokenSymbol) as Token;

  const minBetSize = getMinRequiredAmountToCreateGame(selectedTokenSymbol);
  const [betSize, setBetSize] = useState(String(minBetSize));
  const betSizeNumber = Number(betSize);

  const [blocksAmountTillLiquidation, setBlocksAmountTillLiquidation] = useState(
    DEFAULT_AMOUNT_BLOCKS_BEFORE_LIQUIDABLE,
  );
  const [password, setPassword] = useState('');
  const [shouldSavePassword, setShouldSavePassword] = useState(true);

  const errorMessage = validate();

  function validate(): string {
    const minResolveHours = getHoursFromTerraBlocksAmount(MIN_BLOCKS_BEFORE_LIQUIDABLE);

    if (!isWalletConnected) return 'Wallet is not connected';
    if (betSizeNumber < minBetSize) return `Min bet size is ${minBetSize} ${selectedToken.ticker}`;
    if (selectedToken.balance < betSizeNumber) return 'Insufficient balance';
    if (blocksAmountTillLiquidation < MIN_BLOCKS_BEFORE_LIQUIDABLE) {
      return `Min resolve time-limit is ${minResolveHours} hours`;
    }
    if (password.length < ENCRYPTION_PASSWORD_MIN_LENGTH) {
      return `Min password length is ${ENCRYPTION_PASSWORD_MIN_LENGTH} symbols`;
    }
    return '';
  }

  function handleTokenSymbolChange(symbol: TokenSymbol | TokenSymbol[] | null) {
    if (typeof symbol === 'string') setSelectedTokenSymbol(symbol);
  }

  async function createGame() {
    if (connectedWallet) {
      try {
        setIsModalClosable(false);
        setIsTransactionAttemptStarted(true);

        const { success, result } = await TerraAPI.coinflip.createGame({
          wallet: connectedWallet,
          feeTokenSymbol: DEFAULT_FEES_TOKEN_SYMBOL,
          sendTokens: [[selectedTokenSymbol, betSizeNumber]],
          payload: {
            signature: await encryptChosenSide(chosenSide, password),
            resolveTimeLimit: blocksAmountTillLiquidation,
          },
        });

        if (success) {
          changeView(ModalView.TransactionProcessing, {
            txHash: result.txhash,
            password: `${chosenSide}${ENCRYPTION_PASSWORD_SEPARATOR}${password}`,
            shouldSavePassword,
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
      <Portal node={teleportTo(PortalLocation.CreateGameModalHeader)}>
        <span>Create game</span>
      </Portal>

      <Portal node={teleportTo(PortalLocation.CreateGameModalTopBanner)}>
        <GameFlowAlert style={{ marginBottom: '16px' }} />
      </Portal>

      <Portal node={teleportTo(PortalLocation.CreateGameModalContent)}>
        <WrapperStyled>
          <Space direction="vertical" size={18}>
            <Space direction="vertical">
              <Space>
                <CoinSideChoice side={chosenSide} onSideChange={(side) => setChosenSide(side)} />

                <UiTokensSelect
                  tokens={supportedTokens}
                  selected={selectedTokenSymbol}
                  onChange={handleTokenSymbolChange}
                />
              </Space>

              <UiTokenAmountInput
                value={betSize}
                token={selectedToken}
                min={selectedToken.balance >= minBetSize ? minBetSize : selectedToken.balance}
                onChange={(tokenAmount) => setBetSize(tokenAmount)}
              />
            </Space>

            <ResolveTimeField value={blocksAmountTillLiquidation} onChange={setBlocksAmountTillLiquidation} />

            <PasswordField
              value={password}
              selectedSide={chosenSide}
              switchSize={is414PxOrLess ? 'small' : 'default'}
              onChange={setPassword}
            />

            <SavePasswordCheckbox value={shouldSavePassword} onChange={setShouldSavePassword} />
          </Space>
        </WrapperStyled>
      </Portal>

      <Portal node={teleportTo(PortalLocation.CreateGameModalFooter)}>
        <>
          <ErrorContainerStyled>
            {errorMessage && <Alert message={`${errorMessage}`} type="error" banner />}
          </ErrorContainerStyled>

          <UiButton
            type="primary"
            theme="alternative"
            shape="round"
            loading={isTransactionAttemptStarted}
            disabled={!!errorMessage}
            style={{ width: '140px', pointerEvents: errorMessage ? 'none' : 'auto' }}
            onClick={createGame}
          >
            Create game
          </UiButton>
        </>
      </Portal>
    </>
  );
};

const WrapperStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ErrorContainerStyled = styled.div`
  height: 35px;
  margin-bottom: 12px;
  text-align: left;
  user-select: none;
`;

export default CreateGame;
