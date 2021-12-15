import { ReactComponent as FailImage } from '@/assets/images/fail.svg';
import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { PortalLocation, teleportTo } from '@/utils/common';
import { Space } from 'antd';
import { FC } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { ModalView, ModalViewsProps } from '../../common';

type FailedTransactionData = {
  reason?: string;
};

const TransactionFailed: FC<ModalViewsProps<FailedTransactionData>> = ({ changeView, data }) => {
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
            <div>
              <FailImage fill={APP_DANGER_COLOR} style={{ width: 'auto', height: '120px' }} />
            </div>

            <div>
              <span className="heading-3 text-color-white">Transaction failed</span>
            </div>

            {data.reason && <div>{data.reason}</div>}

            <div>
              <UiButton type="primary" shape="round" uppercase theme="alternative" onClick={redirectToCreateGameView}>
                Try again
              </UiButton>
            </div>
          </Space>
        </ContentStyled>
      </Portal>
    </>
  );
};

const ContentStyled = styled.div`
  height: 100%;
  max-width: 320px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default TransactionFailed;
