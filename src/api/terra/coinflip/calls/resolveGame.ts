import { TxResult } from '@/typings/finance-management';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { ContractCallExecutionParams, evaluateContractCall } from '../../core';
import { convertTokensToCoins } from '../../utils';
import { ActionType, MAIN_CONTRACT_ADDRESS } from '../constants';

export type ResolveGameParams = ContractCallExecutionParams<{
  gameId: string;
  encryptionPassword: string;
}>;

export async function resolveGame(params: ResolveGameParams): Promise<TxResult> {
  const { wallet, payload, sendTokens } = params;

  const transactionEvaluation = await evaluateContractCall(params);

  const message = new MsgExecuteContract(
    wallet.terraAddress,
    MAIN_CONTRACT_ADDRESS[transactionEvaluation.networkKey],
    {
      [ActionType.RESOLVE_BET]: {
        bet_id: payload.gameId,
        passphrase: payload.encryptionPassword,
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
