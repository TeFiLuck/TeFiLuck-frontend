import { CoinSide } from '@/constants/coinflip';
import { TxResult } from '@/typings/finance-management';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { ContractCallExecutionParams, evaluateContractCall } from '../../core';
import { convertTokensToCoins } from '../../utils';
import { ActionType, MAIN_CONTRACT_ADDRESS } from '../constants';

export type AcceptGameParams = ContractCallExecutionParams<{
  gameId: string;
  gameOwnerAddress: string;
  side: CoinSide;
}>;

export async function acceptGame(params: AcceptGameParams): Promise<TxResult> {
  const { wallet, payload, sendTokens } = params;

  const transactionEvaluation = await evaluateContractCall(params);

  const message = new MsgExecuteContract(
    wallet.terraAddress,
    MAIN_CONTRACT_ADDRESS[transactionEvaluation.networkKey],
    {
      [ActionType.ACCEPT_BET]: {
        bet_id: payload.gameId,
        bet_owner: payload.gameOwnerAddress,
        side: payload.side,
      },
    },
    convertTokensToCoins(sendTokens),
  );

  return wallet.post({
    msgs: [message],
    memo: undefined,
    gasPrices: transactionEvaluation.gasPrices,
    fee: transactionEvaluation.fee,
  });
}
