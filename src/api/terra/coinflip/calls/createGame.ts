import { MsgExecuteContract } from '@terra-money/terra.js';
import { ContractCallExecutionParams, evaluateContractCall } from '../../core';
import { convertTokensToCoins } from '../../utils';
import { ActionType, MAIN_CONTRACT_ADDRESS } from '../constants';

export type CreateGameParams = ContractCallExecutionParams<{
  signature: string;
  resolveTimeLimit: number;
}>;

export async function createGame(params: CreateGameParams) {
  const { wallet, payload, sendTokens } = params;

  const transactionEvaluation = await evaluateContractCall(params);

  const message = new MsgExecuteContract(
    wallet.terraAddress,
    MAIN_CONTRACT_ADDRESS[transactionEvaluation.networkKey],
    {
      [ActionType.PLACE_BET]: {
        signature: payload.signature,
        blocks_until_liquidation: payload.resolveTimeLimit,
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
