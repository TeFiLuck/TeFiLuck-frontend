import { OngoingGame } from '@/typings/coinflip';

export enum ModalView {
  ResolveGame = 'resolve_game',
  TransactionFailed = 'transaction_failed',
  TransactionProcessing = 'transaction_processing',
  TransactionSuccess = 'transaction_success',
}

export const INITIAL_MODAL_VIEW = ModalView.ResolveGame;

export interface ModalViewsProps<T extends Record<any, any>> {
  data: T;
  game: OngoingGame;
  changeView: (view: ModalView, viewData?: Record<string, any>) => void;
  setIsModalClosable: (isClosable: boolean) => void;
  closeModal: () => void;
}
