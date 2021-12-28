import { GamesDisplayMode, GAMES_DISPLAY_MODES_CONFIGURATIONS } from '@/constants/coinflip';
import { useConnectedWallet } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import { setGamesDisplayMode } from '@/state/coinflip';
import { BaseSize } from '@/typings/app';
import { isGamesDisplayModePrivate } from '@/utils/coinflip';
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

  const displayableModes = (() => {
    const modes = Object.values(GamesDisplayMode) as GamesDisplayMode[];
    return modes.filter((mode) => {
      return isGamesDisplayModePrivate(mode) ? isWalletConnected : true;
    });
  })();

  const selectSize = size === 'small' ? 'middle' : 'large';

  return (
    <SelectStyled
      value={gamesDisplayMode}
      disabled={disabled}
      size={selectSize}
      onChange={(mode) => dispatch(setGamesDisplayMode(mode as GamesDisplayMode))}
    >
      {displayableModes.map((mode, index) => (
        <Select.Option key={`display-mode__${index}`} value={mode}>
          {GAMES_DISPLAY_MODES_CONFIGURATIONS[mode].label}
        </Select.Option>
      ))}
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
