import { UiBlocksTimeInput } from '@/components/ui';
import { MAX_BLOCKS_BEFORE_LIQUIDABLE, MIN_BLOCKS_BEFORE_LIQUIDABLE } from '@/constants/coinflip';
import { TERRA_BLOCK_GENERATION_TIME_SEC } from '@/constants/networks';
import { useMediaQueries } from '@/hooks';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export interface ResolveTimeFieldProps {
  value: number;
  onChange: (blocksAmount: number) => void;
}

const ResolveTimeField: FC<ResolveTimeFieldProps> = ({ value, onChange }) => {
  const { is414PxOrLess } = useMediaQueries();

  const inputMinWidth = is414PxOrLess ? '135px' : '200px';

  return (
    <Space direction="vertical">
      <div>
        <LabelStyled>
          <Tooltip
            title={
              <span>
                After opponent will start your game, you will need to enter the passphrase to resolve it. To avoid abuse
                of time, we are setting the response time-limit after which game might be ended without evaluation.
                Because its hard to measure time in smart-contracts we use blocks. On Terra:
                <br />
                <b>Approximately each {TERRA_BLOCK_GENERATION_TIME_SEC} seconds ~ 1 block generated</b>
                <br />
                <br />
                <i>
                  Example: opponent starts your game at block 1000, resolve time = 1000 blocks, - you can be liquidated
                  starting from 2001st block.
                </i>
              </span>
            }
            placement="topRight"
          >
            Resolve time-limit before liquidation&nbsp;
            <span className="text-color-info">
              <QuestionCircleFilled />
            </span>
          </Tooltip>
        </LabelStyled>
      </div>

      <UiBlocksTimeInput
        value={value}
        style={{ maxWidth: inputMinWidth }}
        minBlocks={MIN_BLOCKS_BEFORE_LIQUIDABLE}
        maxBlocks={MAX_BLOCKS_BEFORE_LIQUIDABLE}
        onChange={onChange}
      />
    </Space>
  );
};

const LabelStyled = styled.span`
  cursor: help;
  user-select: none;
`;

export default ResolveTimeField;
