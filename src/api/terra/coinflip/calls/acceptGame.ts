import { CoinSide } from '@/constants/coinflip';
import { Network, TxResult } from '@/typings/finance-management';
import { getKeyByNetwork } from '@/utils/networks';
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
  const { wallet, payload, sendTokens, feeTokenSymbol, evaluationRetries } = params;
  const networkKey = getKeyByNetwork(wallet.network as Network);

  const message = new MsgExecuteContract(
    wallet.terraAddress,
    MAIN_CONTRACT_ADDRESS[networkKey],
    {
      [ActionType.ACCEPT_BET]: {
        bet_id: payload.gameId,
        bet_owner: payload.gameOwnerAddress,
        side: payload.side,
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
