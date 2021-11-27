import { UiButton, UiModal, UiTokenAmountInput, UiTokensSelect } from '@/components/ui';
import {
  CoinSide,
  DEFAULT_AMOUNT_BLOCKS_BEFORE_LIQUIDABLE,
  DEFAULT_SELECTED_SIDE,
  ENCRYPTION_PASSWORD_MIN_LENGTH,
  MIN_BLOCKS_BEFORE_LIQUIDABLE,
} from '@/constants/coinflip';
import { TokenSymbol } from '@/constants/tokens';
import { useConnectedWallet, useTokens } from '@/hooks';
import { Token } from '@/typings/finance-management';
import { getMinRequiredAmountToCreateGame } from '@/utils/coinflip';
import { getHoursFromTerraBlocksAmount } from '@/utils/networks';
import { Alert, Space } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';
import CoinSideChoice from '../CoinSideChoice/CoinSideChoice';
import GameFlowAlert from './components/GameFlowAlert/GameFlowAlert';
import PasswordField from './components/PasswordField/PasswordField';
import ResolveTimeField from './components/ResolveTimeField/ResolveTimeField';
import SavePasswordCheckbox from './components/SavePasswordCheckbox/SavePasswordCheckbox';

export interface CreateGameModalProps {
  visible: boolean;
  onChange: (isVisible: boolean) => void;
  onClosed?: () => void;
  onOpened?: () => void;
}

const CreateGameModal: FC<CreateGameModalProps> = ({ visible, onChange, onClosed = () => {}, onOpened = () => {} }) => {
  const { mainToken, supportedTokens } = useTokens();
  const { isWalletConnected } = useConnectedWallet();

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
    if (betSizeNumber < minBetSize) return `Min bet size is ${minBetSize} ${selectedTokenSymbol}`;
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

  return (
    <UiModal
      visible={visible}
      hideDividerHeader
      hideDividerFooter
      width="400px"
      bodyHeight="350px"
      verticalOffset="0"
      footerPadding="8px 0 16px 0px"
      onChange={onChange}
      onClosed={onClosed}
      onOpened={onOpened}
      header={() => <span>Create game</span>}
      topBanner={() => <GameFlowAlert style={{ marginBottom: '16px' }} />}
      footer={() => (
        <ModalFooterStyled>
          <ErrorContainerStyled>
            {errorMessage && <Alert message={`${errorMessage}`} type="error" banner />}
          </ErrorContainerStyled>

          <UiButton
            type="primary"
            theme="alternative"
            shape="round"
            disabled={!!errorMessage}
            style={{ width: '140px', pointerEvents: errorMessage ? 'none' : 'auto' }}
          >
            Create game
          </UiButton>
        </ModalFooterStyled>
      )}
    >
      <ModalContentStyled>
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

          <PasswordField value={password} selectedSide={chosenSide} onChange={setPassword} />

          <SavePasswordCheckbox value={shouldSavePassword} onChange={setShouldSavePassword} />
        </Space>
      </ModalContentStyled>
    </UiModal>
  );
};

const ModalContentStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ModalFooterStyled = styled.div`
  text-align: center;
`;

const ErrorContainerStyled = styled.div`
  height: 35px;
  margin-bottom: 12px;
  text-align: left;
  user-select: none;
`;

export default CreateGameModal;
