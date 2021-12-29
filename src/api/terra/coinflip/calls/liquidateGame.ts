import { TxResult } from '@/typings/finance-management';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { ContractCallExecutionParams, evaluateContractCall } from '../../core';
import { convertTokensToCoins } from '../../utils';
import { ActionType, MAIN_CONTRACT_ADDRESS } from '../constants';

export type LiquidateGameParams = ContractCallExecutionParams<{
  gameId: string;
}>;

export async function liquidateGame(params: LiquidateGameParams): Promise<TxResult> {
  const { wallet, payload, sendTokens } = params;

  const transactionEvaluation = await evaluateContractCall(params);

  const message = new MsgExecuteContract(
    wallet.terraAddress,
    MAIN_CONTRACT_ADDRESS[transactionEvaluation.networkKey],
    {
      [ActionType.LIQUIDATE_BET]: {
        bet_id: payload.gameId,
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
