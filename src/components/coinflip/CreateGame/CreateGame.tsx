import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { UiButton, UiTokenAmountInput, UiTokensSelect } from '@/components/ui';
import { CoinSide, DEFAULT_SELECTED_SIDE } from '@/constants/coinflip';
import { TokenSymbol } from '@/constants/tokens';
import { useTokens } from '@/hooks';
import { Token } from '@/typings/finance-management';
import { getMinRequiredAmountToCreateGame } from '@/utils/coinflip';
import { Space, Tooltip } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';
import CoinSideChoice from '../CoinSideChoice/CoinSideChoice';
import GamesAmountSelect from './components/GamesAmountSelect/GamesAmountSelect';

const CreateGame: FC = () => {
  const { mainToken, supportedTokens } = useTokens();

  const [chosenSide, setChosenSide] = useState<CoinSide>(DEFAULT_SELECTED_SIDE);
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<TokenSymbol>(mainToken.symbol);
  const selectedToken = supportedTokens.find((token) => token.symbol === selectedTokenSymbol) as Token;
  const [betSize, setBetSize] = useState('0');
  const betSizeNumber = Number(betSize);
  const [amountGames, setAmountGames] = useState(1);

  const minBetSize = getMinRequiredAmountToCreateGame(selectedTokenSymbol);
  const errorMessage = validate();

  function validate(): string {
    if (betSizeNumber < minBetSize) return `Min bet size is ${minBetSize}`;
    if (selectedToken.balance < betSizeNumber * amountGames) return 'Insufficient balance';
    return '';
  }

  function handleTokenSymbolChange(symbol: TokenSymbol | TokenSymbol[] | null) {
    if (typeof symbol === 'string') setSelectedTokenSymbol(symbol);
  }

  return (
    <Space>
      <CoinSideChoice side={chosenSide} onSideChange={(side) => setChosenSide(side)} />

      <UiTokensSelect tokens={supportedTokens} selected={selectedTokenSymbol} onChange={handleTokenSymbolChange} />

      <UiTokenAmountInput
        value={betSize}
        token={selectedToken}
        min={selectedToken.balance >= minBetSize ? minBetSize : selectedToken.balance}
        style={{ width: '300px' }}
        onChange={(tokenAmount) => setBetSize(tokenAmount)}
      />

      <GamesAmountSelectContainerStyled>
        <GamesAmountSelect
          value={amountGames}
          token={selectedToken}
          betSize={betSizeNumber}
          onChange={(amount) => setAmountGames(amount)}
        />
      </GamesAmountSelectContainerStyled>

      <Tooltip title={errorMessage} color={APP_DANGER_COLOR}>
        <div>
          <UiButton
            size="large"
            type="primary"
            theme="alternative"
            shape="round"
            disabled={!!errorMessage}
            style={{ width: '140px', pointerEvents: errorMessage ? 'none' : 'auto' }}
          >
            {amountGames > 1 ? `Create ${amountGames} games` : 'Create game'}
          </UiButton>
        </div>
      </Tooltip>
    </Space>
  );
};

const GamesAmountSelectContainerStyled = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CreateGame;
