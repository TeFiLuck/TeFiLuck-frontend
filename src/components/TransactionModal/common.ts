import { TransactionConfig } from '@/typings/finance-management';

export enum ModalView {
  TransactionProcessing = 'transaction_processing',
  TransactionFailed = 'transaction_failed',
  TransactionSuccess = 'transaction_success',
}

export const INITIAL_MODAL_VIEW = ModalView.TransactionProcessing;

export interface ModalViewsProps<T extends Record<any, any>> {
  data: T;
  transactionConfig: TransactionConfig;
  changeView: (view: ModalView, viewData?: Record<string, any>) => void;
  setIsModalClosable: (isClosable: boolean) => void;
  closeModal: () => void;
}
