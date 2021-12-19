import { UiModal } from '@/components/ui';
import { PortalLocation } from '@/constants/portals';
import { useBalances, useMediaQueries } from '@/hooks';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { INITIAL_MODAL_VIEW, ModalView } from './common';
import CreateGame from './views/CreateGame/CreateGame';
import TransactionFailed from './views/TransactionFailed/TransactionFailed';
import TransactionProcessing from './views/TransactionProcessing/TransactionProcessing';
import TransactionSuccess from './views/TransactionSuccess/TransactionSuccess';

export interface CreateGameModalProps {
  visible: boolean;
  onChange: (isVisible: boolean) => void;
  onClosed?: () => void;
  onOpened?: () => void;
}

const CreateGameModal: FC<CreateGameModalProps> = ({ visible, onChange, onClosed = () => {}, onOpened = () => {} }) => {
  const { is515PxOrLess } = useMediaQueries();
  const { updateBalances } = useBalances();
  const [activeModalViewKey, setActiveModalViewKey] = useState<ModalView>(INITIAL_MODAL_VIEW);
  const [viewData, setViewData] = useState({});
  const [isModalClosable, setIsModalClosable] = useState(true);

  const modalViewsMap: Record<ModalView, any> = {
    [ModalView.CreateGame]: CreateGame,
    [ModalView.TransactionFailed]: TransactionFailed,
    [ModalView.TransactionProcessing]: TransactionProcessing,
    [ModalView.TransactionSuccess]: TransactionSuccess,
  };

  const ActiveModalView = modalViewsMap[activeModalViewKey];

  function changeView(view: ModalView, data?: Record<string, any>): void {
    if (data) setViewData(data);
    setActiveModalViewKey(view);
  }

  function handleModalClosed(): void {
    updateBalances();
    onClosed();
  }

  return (
    <UiModal
      visible={visible}
      closable={isModalClosable}
      hideDividerHeader
      hideDividerFooter
      fullScreen={is515PxOrLess}
      width="400px"
      bodyHeight="350px"
      verticalOffset="0"
      footerPadding="8px 0 16px 0px"
      onChange={onChange}
      onClosed={handleModalClosed}
      onOpened={onOpened}
      header={() => <div data-portal-id={PortalLocation.CreateGameModalHeader}></div>}
      topBanner={() => <div data-portal-id={PortalLocation.CreateGameModalTopBanner}></div>}
      footer={() => (
        <ModalFooterStyled>
          <div data-portal-id={PortalLocation.CreateGameModalFooter}></div>
        </ModalFooterStyled>
      )}
    >
      <ModalContentStyled>
        <ActiveModalView data={viewData} changeView={changeView} setIsModalClosable={setIsModalClosable} />

        <div data-portal-id={PortalLocation.CreateGameModalContent} style={{ height: '100%' }}></div>
      </ModalContentStyled>
    </UiModal>
  );
};

const ModalContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ModalFooterStyled = styled.div`
  text-align: center;
`;

export default CreateGameModal;
