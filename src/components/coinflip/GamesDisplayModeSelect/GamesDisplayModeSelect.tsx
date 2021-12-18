import { GamesDisplayMode } from '@/constants/coinflip';
import { useConnectedWallet } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import { setGamesDisplayMode } from '@/state/coinflip';
import { BaseSize } from '@/typings/app';
import { Select } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export interface GamesDisplayModeSelectProps {
  disabled?: boolean;
  size?: BaseSize;
}

const GamesDisplayModeSelect: FC<GamesDisplayModeSelectProps> = ({ disabled = false, size = 'medium' }) => {
  const dispatch = useAppDispatch();
  const { isWalletConnected } = useConnectedWallet();
  const { gamesDisplayMode } = useAppSelector((state) => state.coinflip);

  const selectSize = size === 'small' ? 'middle' : 'large';

  return (
    <SelectStyled
      value={gamesDisplayMode}
      disabled={disabled}
      size={selectSize}
      onChange={(mode) => dispatch(setGamesDisplayMode(mode as GamesDisplayMode))}
    >
      <Select.Option value={GamesDisplayMode.Open}>Pending games</Select.Option>
      {isWalletConnected && <Select.Option value={GamesDisplayMode.My}>My games</Select.Option>}
      <Select.Option value={GamesDisplayMode.PublicLiquidation}>Public liquidation</Select.Option>
      {isWalletConnected && <Select.Option value={GamesDisplayMode.RecentHistory}>Recent history</Select.Option>}
    </SelectStyled>
  );
};

const SelectStyled = styled(Select)`
  width: 140px;
  font-size: 12px;
  border-radius: 4px;
  background: var(--dark-color-5);
  color: var(--white-color);
`;

export default GamesDisplayModeSelect;
