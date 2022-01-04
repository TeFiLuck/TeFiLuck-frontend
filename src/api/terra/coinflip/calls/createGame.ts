import { Network, TxResult } from '@/typings/finance-management';
import { getKeyByNetwork } from '@/utils/networks';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { ContractCallExecutionParams, evaluateContractCall } from '../../core';
import { convertTokensToCoins } from '../../utils';
import { ActionType, MAIN_CONTRACT_ADDRESS } from '../constants';

export type CreateGameParams = ContractCallExecutionParams<{
  signature: string;
  resolveTimeLimit: number;
}>;

export async function createGame(params: CreateGameParams): Promise<TxResult> {
  const { wallet, payload, sendTokens, feeTokenSymbol, evaluationRetries } = params;
  const networkKey = getKeyByNetwork(wallet.network as Network);

  const message = new MsgExecuteContract(
    wallet.terraAddress,
    MAIN_CONTRACT_ADDRESS[networkKey],
    {
      [ActionType.PLACE_BET]: {
        signature: payload.signature,
        blocks_until_liquidation: payload.resolveTimeLimit,
      },
    },
    convertTokensToCoins(sendTokens),
  );

  const txOptions = {
    msgs: [message],
    memo: undefined,
  };

  const { gasPrices, fee } = await evaluateContractCall({
    wallet,
    txOptions,
    feeTokenSymbol,
    maxRetries: evaluationRetries,
  });

  return wallet.post({
    ...txOptions,
    gasPrices,
    fee,
  });
}
