import CoinHeadsImage from '@/assets/images/coin-heads.svg';
import CoinTailsImage from '@/assets/images/coin-tails.svg';
import { BoxStyled } from '@/components/styleds';
import { CoinSide, DEFAULT_SELECTED_SIDE } from '@/constants/coinflip';
import { BaseSize } from '@/typings/app';
import { Space } from 'antd';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

export interface CoinSideChoiceProps {
  side?: CoinSide;
  size?: BaseSize;
  onSideChange?: (side: CoinSide) => void;
}

const CoinSideChoice: FC<CoinSideChoiceProps> = ({
  side = DEFAULT_SELECTED_SIDE,
  size = 'medium',
  onSideChange = () => {},
}) => {
  const [selectedCoinSide, setSelectedCoinSide] = useState<CoinSide>(side);

  useEffect(() => {
    setSelectedCoinSide(side);
  }, [side]);

  useEffect(() => {
    if (selectedCoinSide !== side) onSideChange(selectedCoinSide);
  }, [selectedCoinSide]);

  return (
    <WrapperStyled size={size}>
      <ContentStyled>
        <div className="choice-label">Side:</div>

        <Space size={8}>
          <CoinStyled
            active={selectedCoinSide === CoinSide.Heads}
            background={CoinHeadsImage}
            onClick={() => setSelectedCoinSide(CoinSide.Heads)}
          />

          <CoinStyled
            active={selectedCoinSide === CoinSide.Tails}
            background={CoinTailsImage}
            onClick={() => setSelectedCoinSide(CoinSide.Tails)}
          />
        </Space>
      </ContentStyled>
    </WrapperStyled>
  );
};

export default CoinSideChoice;

const WrapperStyled = styled(BoxStyled)`
  display: flex;
  padding: 0 12px;
  align-items: center;
  justify-content: center;
`;

const ContentStyled = styled.div`
  display: flex;
  align-items: center;

  .choice-label {
    margin-right: 14px;
    user-select: none;
  }
`;

const CoinStyled = styled.div<{
  active: boolean;
  background: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  transition: 0.2s all;

  ${({ background }) => `
    background: url(${background}) center center no-repeat;
    background-size: cover;
  `}

  ${({ active }) =>
    active
      ? `
    box-shadow: 0px 0px 4px 4px rgba(192,0,255,0.35);
  `
      : `
    opacity: 0.2;
    cursor: pointer;

    &:hover {
      opacity: 0.75;
    }
  `}
`;
