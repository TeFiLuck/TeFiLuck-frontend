import { useAppDispatch, useAppSelector } from '@/state';
import { updateBalances as updateBalancesState } from '@/state/finance-management';

export function useBalances() {
  const dispatch = useAppDispatch();
  const { balances } = useAppSelector((state) => state.financeManagement);

  function updateBalances(): void {
    dispatch(updateBalancesState());
  }

  return { balances, updateBalances };
}
