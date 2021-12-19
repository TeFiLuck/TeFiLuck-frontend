export enum ModalView {
  CreateGame = 'create_game',
  TransactionFailed = 'transaction_failed',
  TransactionProcessing = 'transaction_processing',
  TransactionSuccess = 'transaction_success',
}

export const INITIAL_MODAL_VIEW = ModalView.CreateGame;

export interface ModalViewsProps<T extends Record<any, any>> {
  data: T;
  changeView: (view: ModalView, viewData?: Record<string, any>) => void;
  setIsModalClosable: (isClosable: boolean) => void;
}
